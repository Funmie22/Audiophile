
export interface ProductImage {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  image: ProductImage;
  category: 'headphones' | 'speakers' | 'earphones';
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  gallery: {
    first: ProductImage;
    second: ProductImage;
    third: ProductImage;
  };
  others: { slug: string; name: string; image: ProductImage }[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type Page = 'home' | 'category' | 'product' | 'checkout';
export type PageParams = { category?: string; productSlug?: string };
export type NavigateFunction = (page: Page, params?: PageParams) => void;
