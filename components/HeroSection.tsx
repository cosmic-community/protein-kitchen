import Link from 'next/link'
import type { Homepage } from '@/types'

interface HeroSectionProps {
  homepage: Homepage | null
}

export default function HeroSection({ homepage }: HeroSectionProps) {
  const headline = homepage?.metadata?.hero_headline || 'Protein-Packed Recipes for a Stronger You'
  const subtitle = homepage?.metadata?.hero_subtitle || 'Real food, real results. Discover delicious high-protein recipes built around steak, eggs, dairy, and clean starches.'
  const heroImage = homepage?.metadata?.hero_image?.imgix_url

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-rust-900">
        {heroImage && (
          <img
            src={`${heroImage}?w=1920&h=1080&fit=crop&auto=format,compress&q=75`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            width={1920}
            height={1080}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-rust-800/30 border border-rust-600/30 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>🔥</span>
            <span>High-Protein Whole Food Recipes</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-cream-300/90 leading-relaxed mb-10 max-w-2xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center px-8 py-4 bg-rust-700 text-white font-semibold rounded-xl hover:bg-rust-600 transition-colors duration-200 text-lg shadow-lg shadow-rust-900/30"
            >
              Browse Recipes
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-cream-300/30 text-cream-200 font-semibold rounded-xl hover:bg-white/10 transition-colors duration-200 text-lg"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}