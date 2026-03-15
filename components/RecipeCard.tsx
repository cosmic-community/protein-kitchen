import Link from 'next/link'
import type { Recipe } from '@/types'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = recipe.metadata?.featured_image?.imgix_url
  const protein = recipe.metadata?.protein_per_serving || '—'
  const calories = recipe.metadata?.calories || '—'
  const prepTime = recipe.metadata?.prep_time || '—'
  const cookTime = recipe.metadata?.cook_time || '—'
  const categoryTitle = recipe.metadata?.category?.title || ''

  return (
    <Link href={`/recipes/${recipe.slug}`} className="card group block">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={400}
            height={300}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🥩
          </div>
        )}

        {/* Category Badge */}
        {categoryTitle && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-charcoal-800 text-xs font-semibold px-3 py-1 rounded-full">
            {categoryTitle}
          </span>
        )}

        {/* Protein Badge */}
        <span className="absolute top-3 right-3 bg-rust-800/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          {protein}g protein
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-rust-800 transition-colors duration-200 line-clamp-2 mb-2">
          {recipe.title}
        </h3>

        {recipe.metadata?.description && (
          <p className="text-sm text-charcoal-500 line-clamp-2 mb-4">
            {recipe.metadata.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-charcoal-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {prepTime} prep
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            {cookTime} cook
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {calories} cal
          </span>
        </div>
      </div>
    </Link>
  )
}