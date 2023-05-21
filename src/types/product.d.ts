export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  location: string;
  phoneNumber: number;
  email: string;
  imageUrl?: string;
  createdBy: string;
  createdAt: string;
  category: string;
  belongsToId: string;
};

export type ProductsData = {
  products: Product[];
};

export type ProductData = {
  product: Product;
};