'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none text-charcoal-700 prose-headings:text-charcoal-950 prose-a:text-rust-700 prose-strong:text-charcoal-900 prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-2 prose-p:mb-4 prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3 prose-blockquote:border-l-4 prose-blockquote:border-rust-700 prose-blockquote:pl-4 prose-blockquote:italic prose-code:bg-cream-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-charcoal-900 prose-pre:text-cream-100">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}