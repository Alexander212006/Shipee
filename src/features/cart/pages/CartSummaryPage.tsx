import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, getCartSummary } from '../utils/summary';
import { loadCartItems, saveCartItems } from '../utils/storage';

export const CartSummaryPage = () => {
  const [cartItems, setCartItems] = useState(() => loadCartItems());
  const summary = getCartSummary(cartItems);

  const handleRemoveItem = (itemId: number) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => item.id !== itemId);
      saveCartItems(updatedCartItems);
      return updatedCartItems;
    });
  };

  return (
    <section className="mx-auto w-full max-w-5xl py-8 sm:py-12">
      <Link
        to="/products"
        className="inline-flex items-center text-sm font-medium text-zinc-400 transition hover:text-zinc-900 pb-7"
      >
        Back to products
      </Link>

      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">
          Cart Summary
        </h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Review your order before checkout.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Items</h2>
          <div className="mt-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-900">{item.name}</p>
                  <p className="text-xs text-zinc-500">
                    {formatCurrency(item.price)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-zinc-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {cartItems.length === 0 ? (
            <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600">
              Your cart is empty.
            </p>
          ) : null}
        </article>

        <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Order Total</h2>
          <div className="mt-4 space-y-3 text-sm text-zinc-700">
            <div className="flex items-center justify-between">
              <span>Items ({summary.totalItems})</span>
              <span>{formatCurrency(summary.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{summary.shipping === 0 ? 'Free' : formatCurrency(summary.shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>{formatCurrency(summary.tax)}</span>
            </div>
            <div className="border-t border-zinc-200 pt-3 text-base font-semibold text-zinc-900">
              <div className="flex items-center justify-between">
                <span>Total</span>
                <span>{formatCurrency(summary.total)}</span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/products"
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  );
};
