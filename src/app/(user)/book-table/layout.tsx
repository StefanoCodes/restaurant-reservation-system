export default function BookTableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex max-w-7xl flex-col p-4 pt-8 sm:pt-12">
      {children}
    </main>
  );
}
