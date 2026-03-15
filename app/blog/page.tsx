import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/cosmic'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata: Metadata = {
  title: 'Blog — Protein Kitchen',
  description: 'Nutrition tips, meal prep guides, and protein education. Learn how to fuel your body with high-protein whole foods.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-1">Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal-950 tracking-tight mb-3">
          Articles & Guides
        </h1>
        <p className="text-lg text-charcoal-500 max-w-2xl">
          Nutrition tips, meal prep strategies, and everything you need to know about protein-rich eating.
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-cream-300">
          <span className="text-6xl mb-4 block">📝</span>
          <h3 className="text-2xl font-bold text-charcoal-700 mb-2">No Posts Yet</h3>
          <p className="text-charcoal-500 max-w-md mx-auto">
            Articles are on the way. Check back soon for nutrition tips and meal prep guides!
          </p>
        </div>
      )}
    </div>
  )
}