import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  const isNotFound =
    isRouteErrorResponse(error) &&
    (error.status === 404 || error.statusText.toLowerCase() === 'not found');

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-zinc-100 px-4">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(212,212,216,0.20)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,212,216,0.20)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_42%,transparent_100%)]"
        aria-hidden="true"
      />
      <section className="relative z-10 w-full max-w-xl rounded-3xl border border-zinc-200 bg-white/95 p-8 text-center shadow-xl shadow-zinc-500/10 backdrop-blur-sm">
        <p className="text-sm font-semibold tracking-[0.2em] text-zinc-400">{isNotFound ? '404' : 'ERROR'}</p>
        <h1 className="mt-4 text-3xl font-semibold text-zinc-900">
          {isNotFound ? 'Page not found' : 'Something went wrong'}
        </h1>
        <p className="mt-3 text-zinc-600">
          {isNotFound
            ? "The page you're looking for does not exist or was moved."
            : 'An unexpected error happened while loading this page.'}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/products"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Go to products
          </Link>
          <Link
            to="/login"
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Go to login
          </Link>
        </div>
      </section>
    </main>
  );
};
