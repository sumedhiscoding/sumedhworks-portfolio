"use client";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownRenderer({ content }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // ✅ Code blocks
        code({ children, className, ...rest }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter {...rest} language={match[1]} style={oneDark}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              {...rest}
              className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono"
            >
              {children}
            </code>
          );
        },

        // ✅ Blockquote → Playfair + Lora
        blockquote({ children }) {
          return (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 my-6 italic text-gray-800 text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              <span style={{ fontFamily: "var(--font-playfair)" }}>
                {children}
              </span>
            </blockquote>
          );
        },

        // ✅ Headings → Playfair Display
        h1: ({ children }) => (
          <h1
            className="text-4xl font-bold mt-8 mb-4 text-gray-900 leading-snug"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            className="text-3xl font-semibold mt-6 mb-3 text-gray-800"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            className="text-2xl font-semibold mt-5 mb-2 text-gray-800"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {children}
          </h3>
        ),

        // ✅ Paragraphs → Merriweather
        p: ({ children }) => (
          <p
            className="text-gray-700 leading-relaxed mb-5 text-[1.5rem]"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            {children}
          </p>
        ),

        // ✅ Lists → Lora
        ul: ({ children }) => (
          <ul
            className="list-disc list-inside space-y-1 mb-5 text-gray-700"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol
            className="list-decimal list-inside space-y-1 mb-5 text-gray-700"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="ml-2 text-[1.5rem]">{children}</li>
        ),

        // ✅ Tables → fallback to Merriweather or Garamond (if you want, add separately)
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table
              className="border-collapse border border-gray-300 w-full text-sm"
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
