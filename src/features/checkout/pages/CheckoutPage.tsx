import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, getCartSummary } from '@/features/cart/utils/summary';
import { loadCartItems } from '@/features/cart/utils/storage';
import { PaymentMethodRadio } from '../components/PaymentMethodRadio';

export const CheckoutPage = () => {
  const cartItems = loadCartItems();
  const summary = getCartSummary(cartItems);
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <section className="mx-auto w-full max-w-3xl py-8 sm:py-12">
      <Link
        to="/cart/summary"
        className="inline-flex items-center pb-7 text-sm font-medium text-zinc-400 transition hover:text-zinc-900"
      >
        Back to cart summary
      </Link>

      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">Checkout</h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Confirm your order and review payment totals.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-zinc-900">Order Overview</h2>
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

        <div className="mt-6">
          <h3 className="text-base font-semibold text-zinc-900">Payment Method</h3>
          <div className="mt-3 space-y-2">
            <PaymentMethodRadio
              label="Credit / Debit Card"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={setPaymentMethod}
            />
            <PaymentMethodRadio
              label="PayPal"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={setPaymentMethod}
            />
            <PaymentMethodRadio
              label="Cash on Delivery"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={setPaymentMethod}
            />
          </div>
        </div>

        {cartItems.length === 0 ? (
          <p className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600">
            Your cart is empty. Add products before checking out.
          </p>
        ) : null}

        <button
          type="button"
          disabled={cartItems.length === 0}
          className="mt-5 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          Place Order
        </button>
      </div>
    </section>
  );
};
