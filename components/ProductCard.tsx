import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata?.product_image?.imgix_url
  const price = product.metadata?.price || '0'
  const description = product.metadata?.description || ''
  const buyLink = product.metadata?.buy_link || '#'

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={300}
            height={300}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            🛒
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-rust-800 transition-colors mb-2">
          {product.title}
        </h3>

        {description && (
          <p className="text-sm text-charcoal-500 line-clamp-2 mb-4 flex-1">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-cream-200">
          <span className="text-2xl font-bold text-rust-800">
            ${price}
          </span>
          <a
            href={buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sage-600 text-white text-sm font-semibold rounded-lg hover:bg-sage-700 transition-colors duration-200"
          >
            Buy Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}