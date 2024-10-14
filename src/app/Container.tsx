export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto p-4 md:p-8 lg:p-12 ">{children}</main>
  );
}
