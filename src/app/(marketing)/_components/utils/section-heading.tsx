export default function SectionHeading({
  title,
  highlightedText,
}: {
  title: string;
  highlightedText: string;
}) {
  return (
    <h2 className="text-shadow text-4xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
      {title}{" "}
      <span className="text-primary-brand-color">{highlightedText}</span>
    </h2>
  );
}
