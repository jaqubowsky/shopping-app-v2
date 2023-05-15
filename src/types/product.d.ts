export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  createdBy: string;
  createdAt: string;
  category: string;
};

export type ProductsData = {
  products: Product[];
};

export type ProductData = {
  product: Product[];
};