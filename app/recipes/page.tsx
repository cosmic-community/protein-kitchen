import type { Metadata } from 'next'
import { getRecipes, getCategories } from '@/lib/cosmic'
import RecipeFilter from '@/components/RecipeFilter'

export const metadata: Metadata = {
  title: 'Recipes — Protein Kitchen',
  description: 'Browse our collection of high-protein recipes featuring steak, eggs, dairy, and clean starches. Filter by category and find your next meal.',
}

export default async function RecipesPage() {
  const [recipes, categories] = await Promise.all([
    getRecipes(),
    getCategories(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-rust-700 uppercase tracking-wide mb-1">Recipes</p>
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal-950 tracking-tight mb-3">
          Protein-Packed Recipes
        </h1>
        <p className="text-lg text-charcoal-500 max-w-2xl">
          Delicious, high-protein recipes built around whole foods. Every recipe includes full nutrition facts and step-by-step instructions.
        </p>
      </div>

      {/* Filterable Recipe Grid */}
      <RecipeFilter recipes={recipes} categories={categories} />
    </div>
  )
}