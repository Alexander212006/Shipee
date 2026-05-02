import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/productApi';
import type { Product } from '../types';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      const parsedId = Number(productId);

      if (!Number.isFinite(parsedId)) {
        setError('Invalid product id.');
        setIsLoading(false);
        return;
      }

      try {
        setError('');
        const data = await getProductById(parsedId);
        setProduct(data);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error
            ? fetchError.message
            : 'Unable to load product details.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  return (
    <section className="mx-auto w-full max-w-4xl py-8 sm:py-12">
      <Link
        to="/products"
        className="inline-flex items-center text-sm font-medium text-zinc-700 hover:text-zinc-900"
      >
        Back to products
      </Link>

      {isLoading ? (
        <p className="mt-6 text-sm text-zinc-600 sm:text-base">Loading product...</p>
      ) : null}

      {error ? (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {product ? (
        <article className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="bg-zinc-100 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full rounded-xl object-cover sm:h-80"
              loading="lazy"
            />
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                {product.category}
              </span>
              <span className="text-xs text-zinc-500">{product.rating.toFixed(1)} / 5</span>
            </div>

            <h1 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">{product.name}</h1>
            <p className="text-sm leading-6 text-zinc-700 sm:text-base">{product.description}</p>

            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-zinc-900">${product.price.toFixed(2)}</p>
              <p className="text-sm text-zinc-600">Stock: {product.stock}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={product.stock === 0}
                className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
              >
                {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
              </button>

              <button
                type="button"
                disabled={product.stock === 0}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                Checkout
              </button>
            </div>
          </div>
        </article>
      ) : null}
    </section>
  );
};
