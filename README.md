# 🥩 Protein Kitchen

![App Preview](https://imgix.cosmicjs.com/8565a530-2036-11f1-bc0c-3944cd212116-generated-1773555396108.png?w=1200&h=630&fit=crop&auto=format,compress)

A health-focused food blog and product store centered on protein-rich whole foods: steak, eggs, dairy, and light starches like rice and sweet potatoes. Built with Next.js 16, Tailwind CSS, and [Cosmic](https://www.cosmicjs.com/docs) CMS.

## Features

- 🍳 **Filterable Recipe Grid** — Browse recipes by category with instant filtering
- 📊 **Nutrition Facts** — Protein, calories, carbs, and fat displayed for every recipe
- 🛒 **Product Shop** — Curated kitchen products with prices and buy buttons
- 📝 **Blog & Articles** — Nutrition tips, meal prep guides, protein education
- 📧 **Newsletter Signup** — Prominent email capture on homepage and recipe pages
- 🔍 **Recipe Schema Markup** — SEO-optimized with Google rich results support
- 📱 **Mobile-First Design** — Responsive and fast on every device
- 🎨 **Warm Earthy Design** — Appetizing color palette with deep reds and creamy whites

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69b64a57ba38961bee6a2002&clone_repository=69b64fe1ba38961bee6a2041)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online business website with products or services, information pages, and customer testimonials.
>
> User instructions: A health-focused food blog and product store centered on protein-rich whole foods: steak, eggs, dairy, and light starches like rice and sweet potatoes. 
>
> KEY PAGES:
> 1. **Homepage** - Hero with featured recipes, latest posts, and featured products. Clean, appetizing design with warm earthy tones.
> 2. **Recipes page** - Filterable recipe grid. Each recipe has: title, featured image, prep time, cook time, servings, protein per serving, calories, ingredients list, step-by-step instructions, and category tags (beef, eggs, dairy, sides).
> 3. **Individual Recipe pages** - Full recipe with hero image, nutrition facts (protein, calories, carbs, fat), ingredients, instructions, related recipes, and a CTA to shop related products.
> 4. **Shop/Products page** - Product grid with images, prices, descriptions, and buy buttons.
> 5. **About page** - Story behind the blog, mission for protein-rich clean eating.
> 6. **Blog/Articles page** - Nutrition tips, meal prep guides, protein education.
> 7. **Email signup** - Prominent newsletter capture ("Get weekly protein-packed recipes") on homepage and recipe pages.
>
> CONTENT TYPES NEEDED:
> - Recipes (title, image, description, prep_time, cook_time, servings, protein_per_serving, calories, carbs, fat, ingredients, instructions, category, related_products)
> - Products (title, image, description, price, buy_link, category)
> - Blog Posts (title, image, excerpt, content, category)
> - Categories (title, slug)
>
> DEMO CONTENT - Create 6 starter recipes:
> 1. "Perfect Reverse-Sear Ribeye" - 52g protein
> 2. "High-Protein Egg & Cheese Scramble" - 38g protein  
> 3. "Greek Yogurt Protein Bowl with Berries" - 35g protein
> 4. "Steak & Sweet Potato Power Plate" - 48g protein
> 5. "Cottage Cheese Rice Bowl" - 32g protein
> 6. "Cast Iron Butter-Basted Strip Steak with Garlic Rice" - 55g protein
>
> Demo products:
> 1. Premium Steak Seasoning Blend - $14.99
> 2. High-Protein Cookbook (Digital) - $19.99
> 3. Meal Prep Container Set - $24.99
> 4. Cast Iron Skillet - $34.99
>
> DESIGN: Clean, modern, appetizing. Warm color palette (deep reds, creamy whites, earthy greens). High-contrast text. Mobile-first. Fast loading. SEO optimized with schema markup for recipes (Google rich snippets). 
>
> TECH: Next.js with Cosmic CMS integration. Tailwind CSS for styling. Responsive design. SEO meta tags on every page. Recipe schema markup for Google rich results."

### Code Generation Prompt

> "Build a Next.js application for an online business called "Protein Kitchen". The content is managed in Cosmic CMS with the following object types: categories, recipes, products, blog-posts, homepage, about-page. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A health-focused food blog and product store centered on protein-rich whole foods: steak, eggs, dairy, and light starches like rice and sweet potatoes. 
>
> KEY PAGES:
> 1. Homepage - Hero with featured recipes, latest posts, and featured products.
> 2. Recipes page - Filterable recipe grid.
> 3. Individual Recipe pages - Full recipe with hero image, nutrition facts, ingredients, instructions, related recipes.
> 4. Shop/Products page - Product grid with images, prices, descriptions, and buy buttons.
> 5. About page - Story behind the blog.
> 6. Blog/Articles page - Nutrition tips, meal prep guides, protein education.
> 7. Email signup - Prominent newsletter capture on homepage and recipe pages.
>
> DESIGN: Clean, modern, appetizing. Warm color palette (deep reds, creamy whites, earthy greens). High-contrast text. Mobile-first. Fast loading. SEO optimized with schema markup for recipes."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [React 19](https://react.dev/) — UI library

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd protein-kitchen

# Install dependencies
bun install

# Set up environment variables
# Add your Cosmic credentials to your environment
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Cosmic SDK Examples

### Fetching Recipes
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: recipes } = await cosmic.objects
  .find({ type: 'recipes' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Recipe by Slug
```typescript
const { object: recipe } = await cosmic.objects
  .findOne({ type: 'recipes', slug: 'perfect-reverse-sear-ribeye' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Products
```typescript
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses the following Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| 🏷️ Categories | `categories` | Recipe and product categories |
| 🥩 Recipes | `recipes` | Recipe content with nutrition data |
| 🛒 Products | `products` | Shop products with pricing |
| 📝 Blog Posts | `blog-posts` | Articles and nutrition guides |
| 🏠 Homepage | `homepage` | Homepage hero and newsletter content |
| 📄 About Page | `about-page` | About page content |

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project on [Vercel](https://vercel.com)
3. Add your environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY)
4. Deploy

### Netlify

1. Push your code to a GitHub repository
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add your environment variables
5. Deploy

<!-- README_END -->