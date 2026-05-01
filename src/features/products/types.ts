export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
};

export type ProductsResponse = {
  products: Product[];
};

export type DummyJsonProduct = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  thumbnail: string;
};

export type DummyJsonResponse = {
  products: DummyJsonProduct[];
};

