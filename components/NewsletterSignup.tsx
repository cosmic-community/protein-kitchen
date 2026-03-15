'use client'

import { useState, type FormEvent } from 'react'

interface NewsletterSignupProps {
  heading?: string
  subtext?: string
  variant?: 'default' | 'compact'
}

export default function NewsletterSignup({
  heading = 'Get Weekly Protein-Packed Recipes',
  subtext = 'Join thousands of health-focused foodies. Get our best high-protein recipes, meal prep tips, and nutrition guides delivered every week.',
  variant = 'default',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  if (variant === 'compact') {
    return (
      <div className="bg-rust-800 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-white mb-2">{heading}</h3>
        <p className="text-rust-200 text-sm mb-4">{subtext}</p>
        {submitted ? (
          <div className="flex items-center gap-2 text-amber-300 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You&apos;re in! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-rust-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 text-charcoal-950 font-semibold text-sm rounded-lg hover:bg-amber-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    )
  }

  return (
    <section className="bg-gradient-to-br from-rust-800 via-rust-700 to-rust-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">🥩</div>
        <div className="absolute bottom-10 right-10 text-8xl">🍳</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5">💪</div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span>📧</span>
          <span>Free Weekly Newsletter</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {heading}
        </h2>
        <p className="text-lg text-rust-200 max-w-2xl mx-auto mb-8">
          {subtext}
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl">
            <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white font-semibold text-lg">You&apos;re in! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-rust-300 text-base focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-amber-500 text-charcoal-950 font-bold text-base rounded-xl hover:bg-amber-400 transition-colors duration-200 shadow-lg shadow-amber-900/30 whitespace-nowrap"
            >
              Get Recipes →
            </button>
          </form>
        )}

        <p className="text-rust-400 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}