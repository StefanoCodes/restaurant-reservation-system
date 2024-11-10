import Image from "next/image";
import ProgressBar from "./_components/progress-bar";

export default function BookTableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-orange-50 to-white px-4 py-8 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
        <div className="grid md:grid-cols-5">
          <div className="order-2 flex flex-col p-6 md:order-1 md:col-span-3 md:p-8">
            <div className="mb-4">
              <ProgressBar />
            </div>
            <div className="flex-1 space-y-6">{children}</div>
          </div>
          <div className="order-1 md:order-2 md:col-span-2">
            <div className="relative h-48 w-full md:h-full">
              <Image
                fill
                src="/bg-restaurant.jpg"
                alt="Restaurant ambiance"
                className="w-full rounded-t-2xl object-cover transition-all duration-300 ease-in-out md:rounded-l-none md:rounded-r-2xl"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out hover:bg-opacity-30"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl font-bold">Book Your Table</h2>
                <p className="mt-2 text-sm">Experience culinary excellence</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
