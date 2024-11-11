import Link from "next/link";

export default function FooterNavLink({
  link,
}: {
  link: {
    label: string;
    href: string;
  };
}) {
  return (
    <li>
      <Link
        href={link.href}
        className="text-sm text-gray-500 hover:text-primary-brand-color dark:text-gray-400"
      >
        {link.label}
      </Link>
    </li>
  );
}
