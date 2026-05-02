import type { Product, ProductsResponse, DummyJsonProduct, DummyJsonResponse } from '../types';

const PRODUCTS_API_URL = 'https://dummyjson.com/products';

const mapProduct = (product: DummyJsonProduct): Product => {
  return {
    id: product.id,
    name: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    stock: product.stock,
    rating: product.rating,
    image: product.thumbnail,
  };
};

export const getProducts = async (limit = 9, skip = 0): Promise<ProductsResponse> => {
  const response = await fetch(`${PRODUCTS_API_URL}?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }

  const data = (await response.json()) as DummyJsonResponse;

  if (!data.products || !Array.isArray(data.products)) {
    throw new Error('Invalid products data format.');
  }

  return {
    products: data.products.map(mapProduct),
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  };
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${PRODUCTS_API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product details.');
  }

  const data = (await response.json()) as DummyJsonProduct;

  return mapProduct(data);
};
