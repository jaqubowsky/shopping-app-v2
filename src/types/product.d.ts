export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
};

export type ProductsData = {
  products: Product[];
};
