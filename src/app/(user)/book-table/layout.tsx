export default function BookTableLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="max-w-7xl mx-auto p-4 flex flex-col">{children}</div>;
}
