import Link from 'next/link'
import { getHomepage, getRecipes, getProducts, getBlogPosts } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import RecipeCard from '@/components/RecipeCard'
import ProductCard from '@/components/ProductCard'
import BlogPostCard from '@/components/BlogPostCard'
import NewsletterSignup from '@/components/NewsletterSignup'

export default async function HomePage() {
  const [homepage, recipes, products, blogPosts] = await Promise.all([
    getHomepage(),
    getRecipes(),
    getProducts(),
    getBlogPosts(),
  ])

  const featuredRecipes = recipes.slice(0, 3)
  const featuredProducts = products.slice(0, 4)
  const latestPosts = blogPosts.slice(0, 3)

  const newsletterHeading = homepage?.metadata?.newsletter_heading || 'Get Weekly Protein-Packed Recipes'
  const newsletterSubtext = homepage?.metadata?.newsletter_subtext || 'Join thousands of health-focused foodies. Get our best high-protein recipes, meal prep tips, and nutrition guides delivered every week.'

  return (
    <div>
      {/* Hero */}
      <HeroSection homepage={homepage} />

      {/* Featured Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-rust-700 uppercase tracking-wide mb-1">Featured</p>
            <h2 className="section-heading">Protein-Packed Recipes</h2>
            <p className="section-subheading mt-2">Our most popular high-protein recipes to fuel your gains.</p>
          </div>
          <Link href="/recipes" className="btn-outline whitespace-nowrap">
            View All Recipes →
          </Link>
        </div>

        {featuredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-cream-300">
            <span className="text-5xl mb-4 block">🍳</span>
            <p className="text-charcoal-500">No recipes yet. Add some in your Cosmic dashboard!</p>
          </div>
        )}
      </section>

      {/* Products */}
      <section className="bg-white border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-sage-600 uppercase tracking-wide mb-1">Shop</p>
              <h2 className="section-heading">Kitchen Essentials</h2>
              <p className="section-subheading mt-2">Tools and resources to level up your protein cooking game.</p>
            </div>
            <Link href="/shop" className="btn-secondary whitespace-nowrap">
              Browse Shop →
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-cream-50 rounded-2xl border border-cream-200">
              <span className="text-5xl mb-4 block">🛒</span>
              <p className="text-charcoal-500">No products yet. Add some in your Cosmic dashboard!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup heading={newsletterHeading} subtext={newsletterSubtext} />

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-1">Blog</p>
              <h2 className="section-heading">Latest Articles</h2>
              <p className="section-subheading mt-2">Nutrition tips, meal prep guides, and protein education.</p>
            </div>
            <Link href="/blog" className="btn-outline whitespace-nowrap">
              Read More →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}