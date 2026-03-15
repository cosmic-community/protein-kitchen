// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/cosmic'
import BlogPostCard from '@/components/BlogPostCard'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found — Protein Kitchen' }
  }

  return {
    title: `${post.title} — Protein Kitchen Blog`,
    description: post.metadata?.excerpt || `Read ${post.title} on Protein Kitchen.`,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getBlogPosts()
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const imageUrl = post.metadata?.featured_image?.imgix_url
  const categoryTitle = post.metadata?.category?.title || ''
  const content = post.metadata?.content || ''
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <article>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[250px] md:h-[400px] overflow-hidden bg-charcoal-900">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=1920&h=800&fit=crop&auto=format,compress&q=80`}
              alt={post.title}
              className="w-full h-full object-cover opacity-60"
              width={1920}
              height={800}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl opacity-30">📝</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-28 z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {categoryTitle && (
                <span className="bg-sage-100 text-sage-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {categoryTitle}
                </span>
              )}
              {date && (
                <span className="text-xs text-charcoal-400">{date}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal-950 leading-tight">
              {post.title}
            </h1>
            {post.metadata?.excerpt && (
              <p className="mt-4 text-lg text-charcoal-500 leading-relaxed">
                {post.metadata.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {content ? (
          <div
            className="prose prose-lg max-w-none text-charcoal-700 prose-headings:text-charcoal-950 prose-a:text-rust-700 prose-strong:text-charcoal-900 [&_p]:mb-4 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-charcoal-500 text-center py-8">No content available.</p>
        )}

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-cream-300">
          <Link href="/blog" className="text-rust-700 hover:text-rust-800 font-semibold transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-white border-t border-cream-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-8">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <BlogPostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}