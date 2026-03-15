export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
  };
}

export interface Recipe extends CosmicObject {
  type: 'recipes';
  metadata: {
    description?: string;
    featured_image?: CosmicImage;
    prep_time?: string;
    cook_time?: string;
    servings?: string;
    protein_per_serving?: string;
    calories?: string;
    carbs?: string;
    fat?: string;
    ingredients?: string;
    instructions?: string;
    category?: Category;
    related_products?: Product[];
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description?: string;
    product_image?: CosmicImage;
    price?: string;
    buy_link?: string;
    category?: Category;
  };
}

export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    excerpt?: string;
    content?: string;
    featured_image?: CosmicImage;
    category?: Category;
  };
}

export interface Homepage extends CosmicObject {
  type: 'homepage';
  metadata: {
    hero_headline?: string;
    hero_subtitle?: string;
    hero_image?: CosmicImage;
    newsletter_heading?: string;
    newsletter_subtext?: string;
  };
}

export interface AboutPage extends CosmicObject {
  type: 'about-page';
  metadata: {
    headline?: string;
    content?: string;
    page_image?: CosmicImage;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}