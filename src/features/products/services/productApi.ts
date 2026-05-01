import type { Product, ProductsResponse, DummyJsonProduct, DummyJsonResponse } from '../types';



const PRODUCTS_API_URL = 'https://dummyjson.com/products';

const mapProduct = (product: DummyJsonProduct): Product => {
  return {
    id: product.id,
    name: product.title,
    category: product.category,
    price: product.price,
    stock: product.stock,
    rating: product.rating,
    image: product.thumbnail,
  };
};

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(PRODUCTS_API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }

  const data = (await response.json()) as DummyJsonResponse;

  if(!data.products || !Array.isArray(data.products)) {
    throw new Error('Invalid products data format.');
  }

  return {
    products: data.products.map(mapProduct)
  };
};
