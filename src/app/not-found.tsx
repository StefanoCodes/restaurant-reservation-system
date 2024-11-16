import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-6 text-3xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-500">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-opacity-90"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
