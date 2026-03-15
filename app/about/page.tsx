import type { Metadata } from 'next'
import Link from 'next/link'
import { getAboutPage } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'About — Protein Kitchen',
  description: 'The story behind Protein Kitchen. Our mission for protein-rich clean eating with whole foods.',
}

export default async function AboutPage() {
  const about = await getAboutPage()

  const headline = about?.metadata?.headline || 'Our Mission'
  const content = about?.metadata?.content || ''
  const imageUrl = about?.metadata?.page_image?.imgix_url

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-charcoal-950 to-rust-900">
        {imageUrl && (
          <img
            src={`${imageUrl}?w=1920&h=800&fit=crop&auto=format,compress&q=75`}
            alt="About Protein Kitchen"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            width={1920}
            height={800}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>🥩</span>
            <span>About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {headline}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {imageUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={`${imageUrl}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt="About Protein Kitchen"
              className="w-full h-auto"
              width={1200}
              height={600}
            />
          </div>
        )}

        {content ? (
          <div
            className="prose prose-lg max-w-none text-charcoal-700 prose-headings:text-charcoal-950 prose-a:text-rust-700 prose-strong:text-charcoal-900 [&_p]:mb-4 [&_h2]:mt-8 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className="space-y-6 text-lg text-charcoal-700 leading-relaxed">
            <p>
              Welcome to <strong className="text-charcoal-900">Protein Kitchen</strong> — your home for delicious, protein-rich recipes built around real whole foods.
            </p>
            <p>
              We believe that great nutrition doesn&apos;t have to be complicated. Our recipes focus on the most nutrient-dense foods on the planet: grass-fed steak, farm-fresh eggs, full-fat dairy, and clean starches like rice and sweet potatoes.
            </p>
            <p>
              Every recipe is designed with one goal in mind: <strong className="text-charcoal-900">maximize protein while keeping things simple and delicious</strong>. No gimmicks, no complicated ingredients — just real food that fuels real results.
            </p>
            <p>
              Whether you&apos;re bulking, cutting, or just trying to eat better, Protein Kitchen has you covered. Let&apos;s cook something amazing together.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-8 bg-cream-200 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-charcoal-950 mb-3">Ready to Start Cooking?</h3>
          <p className="text-charcoal-500 mb-6 max-w-md mx-auto">
            Browse our collection of protein-packed recipes and find your next favorite meal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/recipes" className="btn-primary">
              Browse Recipes
            </Link>
            <Link href="/shop" className="btn-outline">
              Shop Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}