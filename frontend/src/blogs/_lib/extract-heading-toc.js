/** URL-safe id from heading text */
export function slugifyHeading(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function assignId(text, counts) {
  const base = slugifyHeading(text) || "section";
  counts[base] = (counts[base] || 0) + 1;
  const n = counts[base];
  return n === 1 ? base : `${base}-${n}`;
}

function extractFromMarkdown(md) {
  const lines = md.split("\n");
  const out = [];
  const counts = {};
  let inFence = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{1,3})\s+(.+?)(?:\s+#+\s*)?$/.exec(t);
    if (!m) continue;
    const level = m[1].length;
    let text = m[2]
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/\[(.*?)\]\([^)]*\)/g, "$1")
      .trim();
    if (!text) continue;
    out.push({ level, text, id: assignId(text, counts) });
  }
  return out;
}

function extractFromHtml(html) {
  const out = [];
  const counts = {};
  const re = /<h([1-3])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const level = parseInt(m[1], 10);
    const inner = m[3].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!inner) continue;
    out.push({ level, text: inner, id: assignId(inner, counts) });
  }
  return out;
}

/**
 * Build ordered TOC from markdown (# headings) or Strapi rich-text HTML (<h1–h3>).
 */
export function extractHeadingToc(content) {
  if (!content || typeof content !== "string") return [];
  const trimmed = content.trim();
  if (trimmed.includes("<h")) {
    return extractFromHtml(trimmed);
  }
  return extractFromMarkdown(trimmed);
}
