import { Link } from 'react-router-dom';
import type { Product } from '../types';

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={product.stock === 0}
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
          <Link
            to={`/products/${product.id}`}
            className="whitespace-nowrap rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
};
