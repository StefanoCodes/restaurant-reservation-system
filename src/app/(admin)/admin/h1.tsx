export default function H1({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="text-2xl md:text-3xl font-bold pb-1 border-b-2 border-secondary/20">
			{children}
		</h1>
	);
}
