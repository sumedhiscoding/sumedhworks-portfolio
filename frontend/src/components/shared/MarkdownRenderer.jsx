import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { slugifyHeading } from "@/blogs/_lib/extract-heading-toc";

function getPlainText(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number")
    return String(node);
  if (Array.isArray(node)) return node.map(getPlainText).join("");
  if (typeof node === "object" && node.props?.children != null) {
    return getPlainText(node.props.children);
  }
  return "";
}

export default function MarkdownRenderer({ content, tocEntries = [] }) {
  let tocIndex = 0;
  let fallbackSeq = 0;

  function headingId(level, children) {
    while (
      tocIndex < tocEntries.length &&
      tocEntries[tocIndex].level !== level
    ) {
      tocIndex++;
    }
    if (
      tocIndex < tocEntries.length &&
      tocEntries[tocIndex].level === level
    ) {
      return tocEntries[tocIndex++].id;
    }
    const text = getPlainText(children);
    const base = slugifyHeading(text) || "heading";
    return `${base}-${fallbackSeq++}`;
  }

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ children, className, ...rest }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter {...rest} language={match[1]} style={oneDark}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              {...rest}
              className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-red-600"
            >
              {children}
            </code>
          );
        },

        blockquote({ children }) {
          return (
            <blockquote
              className="my-6 border-l-4 border-gray-300 pl-4 text-lg italic leading-relaxed text-gray-800"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              <span style={{ fontFamily: "var(--font-playfair)" }}>
                {children}
              </span>
            </blockquote>
          );
        },

        h1: ({ children }) => (
          <h1
            id={headingId(1, children)}
            className="scroll-mt-24 mt-8 mb-4 text-4xl leading-snug font-bold text-gray-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            id={headingId(2, children)}
            className="scroll-mt-24 mt-6 mb-3 text-3xl font-semibold text-gray-800"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            id={headingId(3, children)}
            className="scroll-mt-24 mt-5 mb-2 text-2xl font-semibold text-gray-800"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p
            className="mb-5 text-[1.5rem] leading-relaxed text-gray-700"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul
            className="mb-5 list-inside list-disc space-y-1 text-gray-700"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol
            className="mb-5 list-inside list-decimal space-y-1 text-gray-700"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="ml-2 text-[1.5rem]">{children}</li>
        ),

        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table
              className="w-full border-collapse border border-gray-300 text-sm"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th
            className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-semibold"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            className="border border-gray-300 px-3 py-2"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            {children}
          </td>
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
