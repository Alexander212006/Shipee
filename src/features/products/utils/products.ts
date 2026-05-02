import type { Product } from '../types';

export const getProductsSkip = (currentPage: number, itemsPerPage: number): number => {
  return (currentPage - 1) * itemsPerPage;
};

export const getTotalPages = (totalProducts: number, itemsPerPage: number): number => {
  return Math.max(Math.ceil(totalProducts / itemsPerPage), 1);
};

export const getProductCategories = (products: Product[]): string[] => {
  return Array.from(new Set(products.map((product) => product.category)));
};

export const filterProducts = (
  products: Product[],
  search: string,
  selectedCategory: string,
  inStockOnly: boolean
): Product[] => {
  const normalizedSearch = search.toLowerCase();

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(normalizedSearch);
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStock = !inStockOnly || product.stock > 0;

    return matchesSearch && matchesCategory && matchesStock;
  });
};

export const getPageNumbers = (totalPages: number): number[] => {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
};
