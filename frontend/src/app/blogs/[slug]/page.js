// app/blogs/[slug]/page.js

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ConditionalRenderer from "@/app/components/ConditionalRenderer";
import getCategoryColor from "@/app/helper/get-category-colors";
import { fetchBlogs } from "@/app/helper/fetchhelper";
import { apiendpoints, config } from "../../../../config/config";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Footer from "@/app/components/Footer";
import { SpotlightCustomColor } from "@/app/components/SpotlightCustomColor/SpotlightCustomColor";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";

export async function generateMetadata({ params }) {
  const blogs = await fetchBlogs(
    `${apiendpoints.GET_ALL_BLOGS_API}&filters[slug][$eq]=${params.slug}`
  );
  const blog = blogs.data[0];

  return {
    title: `${blog.title} | My Portfolio Blog`,
    description: blog.blocks[0]?.body.slice(0, 150),
  };
}

const BlogDetails = async ({ params }) => {
  const { slug } = params;

  const blogs = await fetchBlogs(
    `${apiendpoints.GET_ALL_BLOGS_API}&filters[slug][$eq]=${slug}`
  );

  if (!blogs?.data?.length)
    return (
      <div className="text-center py-20 text-gray-500">Blog not found.</div>
    );

  const blog = blogs.data[0];

  return (
    <SpotlightCustomColor className="">
      <div className="h-full w-full overflow-y-auto scrollbar scroll-smooth p-5">
        {/* Blog Header */}
        <div className="pt-12 mb-8 border-b border-gray-200">
          <ConditionalRenderer condition={blog.title}>
            <h1 className="text-4xl font-bold leading-tight mb-4 text-[3rem]">
              {blog.title}
            </h1>
          </ConditionalRenderer>

          <ConditionalRenderer condition={blog.categories}>
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-${getCategoryColor(
                    cat.name
                  )}`}
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </ConditionalRenderer>
        </div>

        {/* Cover Image */}
        <div className="mb-12">
          {blog.cover && blog.cover.formats && blog.cover.formats.large && (
            <Image
              className="rounded-xl shadow-lg object-cover w-full max-h-[500px]"
              src={`${config.STRAPI_BACKEND_BASEURL}${blog.cover.formats.large.url}`}
              alt="thumbnail"
              width={blog.cover.formats.large.width}
              height={blog.cover.formats.large.height}
            />
          )}
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg prose-slate max-w-none leading-relaxed">
          <ConditionalRenderer condition={blog.blocks?.[0]?.body}>
            <MarkdownRenderer content={blog.blocks?.[0]?.body} />
            {/* <article>
              <ReactMarkdown
                components={{
                  code({ className = "", children }) {
                    const language =
                      className.replace("language-", "") || "text";
                    return (
                      <SyntaxHighlighter
                        style={materialDark}
                        language={language}
                        className="rounded-lg !p-4 text-sm my-4"
                      >
                        {String(children).trim()}
                      </SyntaxHighlighter>
                    );
                  },
                }}
              > */}
            {/* {blog.blocks[0].body} */}
            {/* </ReactMarkdown> */}
            {/* </article> */}
          </ConditionalRenderer>
        </div>

        {/* Footer */}
        <div className="mt-20 border-t border-gray-200 pt-10">
          <Footer />
        </div>
      </div>
    </SpotlightCustomColor>
  );
};

// For static site generation
export const generateStaticParams = async () => {
  const blogs = await fetchBlogs(apiendpoints.GET_ALL_BLOGS_API);
  return blogs.data.map((blog) => ({
    slug: blog.slug,
  }));
};

export default BlogDetails;
