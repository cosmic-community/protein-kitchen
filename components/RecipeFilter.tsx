'use client'

import { useState, useMemo } from 'react'
import type { Recipe, Category } from '@/types'
import RecipeCard from '@/components/RecipeCard'

interface RecipeFilterProps {
  recipes: Recipe[]
  categories: Category[]
}

export default function RecipeFilter({ recipes, categories }: RecipeFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredRecipes = useMemo(() => {
    if (activeCategory === 'all') return recipes
    return recipes.filter((recipe) => {
      const recipeCategory = recipe.metadata?.category
      if (!recipeCategory) return false
      return recipeCategory.slug === activeCategory || recipeCategory.title === activeCategory
    })
  }, [recipes, activeCategory])

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
            activeCategory === 'all'
              ? 'bg-rust-800 text-white shadow-md'
              : 'bg-white text-charcoal-600 border border-cream-300 hover:bg-cream-200'
          }`}
        >
          All Recipes
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
              activeCategory === cat.slug
                ? 'bg-rust-800 text-white shadow-md'
                : 'bg-white text-charcoal-600 border border-cream-300 hover:bg-cream-200'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-charcoal-500 mb-6">
        Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
      </p>

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">🍽️</span>
          <h3 className="text-xl font-bold text-charcoal-700 mb-2">No recipes found</h3>
          <p className="text-charcoal-500">
            Try selecting a different category to find delicious recipes.
          </p>
        </div>
      )}
    </div>
  )
}