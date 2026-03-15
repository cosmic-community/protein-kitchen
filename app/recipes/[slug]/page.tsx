// app/recipes/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getRecipeBySlug, getRecipes } from '@/lib/cosmic'
import NutritionFacts from '@/components/NutritionFacts'
import RecipeCard from '@/components/RecipeCard'
import NewsletterSignup from '@/components/NewsletterSignup'
import ProductCard from '@/components/ProductCard'

interface RecipePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

  if (!recipe) {
    return { title: 'Recipe Not Found — Protein Kitchen' }
  }

  return {
    title: `${recipe.title} — Protein Kitchen`,
    description: recipe.metadata?.description || `High-protein recipe: ${recipe.title}`,
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

  if (!recipe) {
    notFound()
  }

  const allRecipes = await getRecipes()
  const relatedRecipes = allRecipes
    .filter((r) => r.slug !== recipe.slug)
    .slice(0, 3)

  const imageUrl = recipe.metadata?.featured_image?.imgix_url
  const categoryTitle = recipe.metadata?.category?.title || ''
  const ingredients = recipe.metadata?.ingredients || ''
  const instructions = recipe.metadata?.instructions || ''
  const relatedProducts = recipe.metadata?.related_products

  // Recipe schema markup for Google rich results
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.metadata?.description || '',
    image: imageUrl ? `${imageUrl}?w=1200&h=800&fit=crop&auto=format,compress` : undefined,
    prepTime: recipe.metadata?.prep_time ? `PT${recipe.metadata.prep_time.replace(/\D/g, '')}M` : undefined,
    cookTime: recipe.metadata?.cook_time ? `PT${recipe.metadata.cook_time.replace(/\D/g, '')}M` : undefined,
    recipeYield: recipe.metadata?.servings || undefined,
    nutrition: {
      '@type': 'NutritionInformation',
      proteinContent: recipe.metadata?.protein_per_serving ? `${recipe.metadata.protein_per_serving}g` : undefined,
      calories: recipe.metadata?.calories ? `${recipe.metadata.calories} calories` : undefined,
      carbohydrateContent: recipe.metadata?.carbs ? `${recipe.metadata.carbs}g` : undefined,
      fatContent: recipe.metadata?.fat ? `${recipe.metadata.fat}g` : undefined,
    },
    recipeCategory: categoryTitle || 'Main Course',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden bg-charcoal-900">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=1920&h=1000&fit=crop&auto=format,compress&q=80`}
              alt={recipe.title}
              className="w-full h-full object-cover opacity-70"
              width={1920}
              height={1000}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-9xl opacity-30">🥩</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {categoryTitle && (
                <span className="bg-rust-100 text-rust-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {categoryTitle}
                </span>
              )}
              {recipe.metadata?.protein_per_serving && (
                <span className="bg-sage-100 text-sage-800 text-xs font-semibold px-3 py-1 rounded-full">
                  💪 {recipe.metadata.protein_per_serving}g protein
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal-950 leading-tight mb-4">
              {recipe.title}
            </h1>

            {recipe.metadata?.description && (
              <p className="text-lg text-charcoal-500 leading-relaxed mb-6">
                {recipe.metadata.description}
              </p>
            )}

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm text-charcoal-600">
              {recipe.metadata?.prep_time && (
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏱️</span>
                  <div>
                    <p className="font-semibold">{recipe.metadata.prep_time}</p>
                    <p className="text-xs text-charcoal-400">Prep Time</p>
                  </div>
                </div>
              )}
              {recipe.metadata?.cook_time && (
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <div>
                    <p className="font-semibold">{recipe.metadata.cook_time}</p>
                    <p className="text-xs text-charcoal-400">Cook Time</p>
                  </div>
                </div>
              )}
              {recipe.metadata?.servings && (
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍽️</span>
                  <div>
                    <p className="font-semibold">{recipe.metadata.servings}</p>
                    <p className="text-xs text-charcoal-400">Servings</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Ingredients */}
            {ingredients && (
              <div>
                <h2 className="text-2xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span>🧂</span> Ingredients
                </h2>
                <div className="bg-cream-50 rounded-xl border border-cream-300 p-6">
                  <div
                    className="prose prose-sm max-w-none text-charcoal-700 [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-4"
                    dangerouslySetInnerHTML={{ __html: ingredients }}
                  />
                </div>
              </div>
            )}

            {/* Instructions */}
            {instructions && (
              <div>
                <h2 className="text-2xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span>👨‍🍳</span> Instructions
                </h2>
                <div className="bg-white rounded-xl border border-cream-300 p-6">
                  <div
                    className="prose max-w-none text-charcoal-700 [&_li]:mb-3 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:mb-3"
                    dangerouslySetInnerHTML={{ __html: instructions }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <NutritionFacts
              protein={recipe.metadata?.protein_per_serving}
              calories={recipe.metadata?.calories}
              carbs={recipe.metadata?.carbs}
              fat={recipe.metadata?.fat}
              servings={recipe.metadata?.servings}
            />

            <NewsletterSignup variant="compact" />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && Array.isArray(relatedProducts) && relatedProducts.length > 0 && (
        <section className="bg-white border-y border-cream-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6 flex items-center gap-2">
              <span>🛒</span> Shop Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => {
                if (!product || !product.id) return null
                return <ProductCard key={product.id} product={product} />
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-charcoal-950">More Recipes You&apos;ll Love</h2>
              <p className="text-charcoal-500 mt-1">Keep the protein coming.</p>
            </div>
            <Link href="/recipes" className="text-rust-700 hover:text-rust-800 font-semibold text-sm transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}