export default function Loading() {
  return (
    <div className="w-full">
      <div className="mx-auto min-h-[100dvh] max-w-7xl space-y-6 p-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex h-8 w-48 animate-pulse items-center justify-start rounded-md bg-gray-200 px-4 py-2">
            <span className="text-sm">Loading...</span>
          </div>
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
        </div>

        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 space-y-3 rounded-lg border p-4">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Table skeleton */}
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
