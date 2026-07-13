export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  quantityText?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}
