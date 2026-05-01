import { useEffect, useState } from 'react';
import { getProducts } from '../services/productApi';
import type { Product } from '../types';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError('');
        const data = await getProducts();
        setProducts(data.products);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error ? fetchError.message : 'Unable to load products.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl py-8 sm:py-12">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">
          Product List
        </h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Browse available products in your catalog.
        </p>
      </header>

      {isLoading ? (
        <p className="text-sm text-zinc-600 sm:text-base">Loading products...</p>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
          >
            <div className="bg-zinc-100 p-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-44 w-full rounded-lg object-cover opacity-100"
                loading="lazy"
              />
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  {product.category}
                </span>
                <span className="text-xs text-zinc-500">
                  {product.rating.toFixed(1)} / 5
                </span>
              </div>

              <h2 className="line-clamp-1 text-base font-semibold text-zinc-900 sm:text-lg">
                {product.name}
              </h2>

              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-zinc-900">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-zinc-600">Stock: {product.stock}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
