import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-950 text-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🥩</span>
              <span className="text-2xl font-bold text-white">Protein Kitchen</span>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed max-w-sm">
              Fueling your body with protein-rich whole foods. Real food, real results — steak, eggs, dairy, and clean starches.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/recipes', label: 'Recipes' },
                { href: '/shop', label: 'Shop' },
                { href: '/blog', label: 'Blog' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-charcoal-400 hover:text-amber-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Beef', 'Eggs', 'Dairy', 'Sides'].map((cat) => (
                <li key={cat}>
                  <span className="text-charcoal-400 text-sm">{cat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-charcoal-500 text-sm">
            © {currentYear} Protein Kitchen. All rights reserved.
          </p>
          <p className="text-charcoal-500 text-sm">
            Built for gains. Powered by whole foods.
          </p>
        </div>
      </div>
    </footer>
  )
}