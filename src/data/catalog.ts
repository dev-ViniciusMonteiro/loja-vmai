import storeData from "./store-data.json";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  category: string;
  name: string;
  price: number;
  description: string;
  image: string;
  featured?: boolean;
  badge?: string;
  features?: string[];
};

export type CatalogData = {
  categories: Category[];
  products: Product[];
};

export const catalog: CatalogData = storeData as CatalogData;

export function getCategoryBySlug(slug: string) {
  return catalog.categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return catalog.products.filter((product) => product.category === slug);
}

export function getProductBySlug(slug: string) {
  return catalog.products.find((product) => product.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
