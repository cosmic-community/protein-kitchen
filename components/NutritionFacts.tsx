interface NutritionFactsProps {
  protein?: string
  calories?: string
  carbs?: string
  fat?: string
  servings?: string
}

export default function NutritionFacts({
  protein,
  calories,
  carbs,
  fat,
  servings,
}: NutritionFactsProps) {
  const facts = [
    { label: 'Protein', value: protein, unit: 'g', icon: '💪', color: 'bg-rust-50 text-rust-800 border-rust-200' },
    { label: 'Calories', value: calories, unit: '', icon: '🔥', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { label: 'Carbs', value: carbs, unit: 'g', icon: '🌾', color: 'bg-sage-50 text-sage-800 border-sage-200' },
    { label: 'Fat', value: fat, unit: 'g', icon: '🧈', color: 'bg-cream-200 text-charcoal-800 border-cream-300' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-cream-300 p-6">
      <h3 className="text-lg font-bold text-charcoal-900 mb-1">Nutrition Facts</h3>
      {servings && (
        <p className="text-sm text-charcoal-500 mb-4">Per serving · {servings} servings</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {facts.map((fact) => {
          if (!fact.value) return null
          return (
            <div
              key={fact.label}
              className={`${fact.color} rounded-xl border p-4 text-center`}
            >
              <span className="text-xl mb-1 block">{fact.icon}</span>
              <p className="text-2xl font-bold leading-tight">
                {fact.value}{fact.unit}
              </p>
              <p className="text-xs font-medium opacity-70 uppercase tracking-wide mt-0.5">
                {fact.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}