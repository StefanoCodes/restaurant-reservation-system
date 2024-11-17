export default function Stat({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold md:text-3xl">{title}</h3>

      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
