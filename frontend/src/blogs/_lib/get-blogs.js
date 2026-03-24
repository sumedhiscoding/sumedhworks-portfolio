import { apiendpoints, config } from "@/config";
import { fetchBlogs } from "@/helper/fetchhelper";

const STRAPI_BASE = config.STRAPI_BACKEND_BASEURL;

const LISTING_COVER_PLACEHOLDER =
  "https://placehold.co/800x500/e2e8f0/64748b?text=Blog";

/** Strapi v4 nested `attributes`; v5 flat documents — normalize to one shape */
function unwrapEntry(entry) {
  if (!entry) return null;
  if (entry.attributes != null) {
    return { id: entry.id, documentId: entry.documentId, ...entry.attributes };
  }
  return entry;
}

function absoluteUrl(path) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${STRAPI_BASE}${path}`;
}

function coverLarge(cover) {
  const f = cover?.formats?.large;
  if (!f?.url) return null;
  return {
    url: absoluteUrl(f.url),
    width: f.width,
    height: f.height,
  };
}

/**
 * Article `blocks` is a dynamic zone; rich text lives in `shared.rich-text` with `body` (often HTML).
 */
export function extractBodyFromBlocks(blog) {
  const blocks = blog?.blocks;
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  const rich = blocks.find(
    (b) =>
      b.__component === "shared.rich-text" &&
      b.body != null &&
      String(b.body).trim() !== ""
  );
  if (rich?.body != null) return String(rich.body);
  const any = blocks.find((b) => b.body != null && String(b.body).trim() !== "");
  return any?.body != null ? String(any.body) : "";
}

function stripHtmlForExcerpt(html) {
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFromBlocks(blog, maxLen = 100) {
  const raw = extractBodyFromBlocks(blog);
  if (!raw) {
    const desc = blog?.description;
    if (desc && typeof desc === "string") {
      const t = desc.trim();
      return t.length <= maxLen ? t : `${t.slice(0, maxLen).trim()}…`;
    }
    return "";
  }
  const text = raw.includes("<") ? stripHtmlForExcerpt(raw) : raw;
  const stripped = text.replace(/[#*`_[\]]/g, "").replace(/\s+/g, " ").trim();
  return stripped.length <= maxLen
    ? stripped
    : `${stripped.slice(0, maxLen).trim()}…`;
}

function formatBlogDate(blog) {
  const d = blog.publishedAt || blog.createdAt;
  if (!d) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
      .format(new Date(d))
      .toUpperCase();
  } catch {
    return "";
  }
}

function coverListingUrl(cover) {
  return (
    absoluteUrl(cover?.formats?.large?.url) ||
    absoluteUrl(cover?.formats?.medium?.url) ||
    absoluteUrl(cover?.url)
  );
}

export function mapStrapiBlogToListingItem(blog) {
  const categoryName = blog.categories?.[0]?.name || "General";
  return {
    slug: blog.slug,
    title: blog.title,
    summary: excerptFromBlocks(blog, 100),
    excerpt: excerptFromBlocks(blog, 280),
    categories: blog.categories ?? [],
    categoryLabel: categoryName.toUpperCase().replace(/\s+/g, " "),
    publishedLabel: formatBlogDate(blog),
    coverUrl: coverListingUrl(blog.cover) ?? LISTING_COVER_PLACEHOLDER,
    href: `/blogs/${blog.slug}`,
    raw: blog,
  };
}

export function mapStrapiBlogToArticle(blog) {
  return {
    slug: blog.slug,
    title: blog.title,
    bodyMarkdown: extractBodyFromBlocks(blog),
    categories: blog.categories ?? [],
    cover: coverLarge(blog.cover),
    raw: blog,
  };
}

/**
 * One request: all published articles (Strapi hides drafts for public).
 * Split featured vs rest in the client so entries with `isFeatured: false` always appear
 * (two filtered API calls can miss edge cases).
 * Returns `null` if the request failed (network, 403, etc.).
 */
export async function getBlogListingData() {
  const res = await fetchBlogs(apiendpoints.GET_ALL_BLOGS_API);
  if (res == null) return null;
  const rows = Array.isArray(res.data) ? res.data : [];
  const blogs = rows.map(unwrapEntry).filter(Boolean);
  const items = blogs.map(mapStrapiBlogToListingItem);
  const featured = items.filter((item) => item.raw?.isFeatured === true);
  const rest = items.filter((item) => item.raw?.isFeatured !== true);
  return { featured, rest };
}

export async function getBlogArticleBySlug(slug) {
  const res = await fetchBlogs(
    `${apiendpoints.GET_ALL_BLOGS_API}&filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  if (res == null) return null;
  const row = res.data?.[0];
  const blog = unwrapEntry(row);
  return blog ? mapStrapiBlogToArticle(blog) : null;
}
