import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from "@/features/cart/types";
import { loadCartItems, saveCartItems } from "@/features/cart/utils/storage";
import { clearAuthorizedSession } from "@/features/auth/utils/session";
import toast from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS_PER_PAGE } from "../constants/pagination";
import { getProducts } from "../services/productApi";
import type { Product } from "../types";
import {
  filterProducts,
  getPageNumbers,
  getProductCategories,
  getProductsSkip,
  getTotalPages,
} from "../utils/products";

export const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadCartItems());
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        setError("");
        const skip = getProductsSkip(currentPage, PRODUCTS_PER_PAGE);
        const data = await getProducts(PRODUCTS_PER_PAGE, skip);
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load products.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, [currentPage]);

  const categories = getProductCategories(products);
  const filteredProducts = filterProducts(
    products,
    search,
    selectedCategory,
    inStockOnly,
  );
  const totalPages = getTotalPages(totalProducts, PRODUCTS_PER_PAGE);
  const totalCartItems = cartItems.length;

  const handleAddToCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...prevCartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });

    toast.success(`${product.name} added to cart`);
  };

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const handleLogout = () => {
    clearAuthorizedSession();
    navigate("/login", { replace: true });
  };

  return (
    <section className="mx-auto w-full max-w-6xl py-8 sm:py-12">
      <header className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">
            Product List
          </h1>
          <p className="mt-2 text-sm text-zinc-600 sm:text-base">
            Browse available products in your catalog.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/cart/summary"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 text-zinc-700 transition hover:bg-zinc-100"
            aria-label="Go to cart summary"
          >
            <IoCartOutline className="h-6 w-6" aria-hidden="true" />
            {totalCartItems > 0 ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-zinc-900 px-1.5 py-0.5 text-xs font-semibold text-white">
                {totalCartItems}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Logout
          </button>
        </div>
      </header>

      {isLoading ? (
        <p className="text-sm text-zinc-600 sm:text-base">
          Loading products...
        </p>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mb-5 grid grid-cols-1 gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:grid-cols-3">
        <div className="relative">
          <IoSearchOutline
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search product name..."
            className="h-10 w-full rounded-lg border border-zinc-300 pl-9 pr-3 text-sm outline-none ring-blue-500/40 placeholder:text-zinc-400 focus:ring-2"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="h-10 rounded-lg border border-zinc-300 px-3 text-sm outline-none ring-blue-500/40 focus:ring-2"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label className="flex h-10 items-center gap-2 rounded-lg border border-zinc-300 px-3 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
            className="h-4 w-4 accent-zinc-900"
          />
          In stock only
        </label>
      </div>

      {!isLoading && !error ? (
        <p className="mb-4 text-sm text-zinc-600">
          Showing {filteredProducts.length} products on page {currentPage} of{" "}
          {totalPages}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {!isLoading && !error && filteredProducts.length === 0 ? (
        <p className="mt-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
          No products match the selected filters.
        </p>
      ) : null}

      {!isLoading && !error && filteredProducts.length > 0 ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {getPageNumbers(totalPages).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-3 py-2 text-sm ${
                page === currentPage
                  ? "bg-zinc-900 text-white"
                  : "border border-zinc-300 text-zinc-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      ) : null}
    </section>
  );
};
