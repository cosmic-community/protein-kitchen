import Link from 'next/link'
import type { BlogPost } from '@/types'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const imageUrl = post.metadata?.featured_image?.imgix_url
  const excerpt = post.metadata?.excerpt || ''
  const categoryTitle = post.metadata?.category?.title || ''
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <Link href={`/blog/${post.slug}`} className="card group block">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-200">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={400}
            height={250}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            📝
          </div>
        )}

        {categoryTitle && (
          <span className="absolute top-3 left-3 bg-sage-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
            {categoryTitle}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {date && (
          <p className="text-xs text-charcoal-400 uppercase tracking-wide mb-2">
            {date}
          </p>
        )}
        <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-rust-800 transition-colors duration-200 line-clamp-2 mb-2">
          {post.title}
        </h3>
        {excerpt && (
          <p className="text-sm text-charcoal-500 line-clamp-3">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}