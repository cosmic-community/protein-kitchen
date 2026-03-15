import type { Metadata } from 'next'
import { getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Shop — Protein Kitchen',
  description: 'Shop kitchen essentials, cookbooks, meal prep tools, and seasoning blends curated for high-protein cooking.',
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-sage-600 uppercase tracking-wide mb-1">Shop</p>
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal-950 tracking-tight mb-3">
          Kitchen Essentials
        </h1>
        <p className="text-lg text-charcoal-500 max-w-2xl">
          Tools, cookbooks, and seasoning blends to level up your protein cooking game. Everything you need to make incredible meals.
        </p>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-cream-300">
          <span className="text-6xl mb-4 block">🛒</span>
          <h3 className="text-2xl font-bold text-charcoal-700 mb-2">Coming Soon</h3>
          <p className="text-charcoal-500 max-w-md mx-auto">
            We&apos;re curating the best kitchen products for you. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}