import { marketingConfig } from "@/app/(marketing)/marketing.config";
const { socialLinks } = marketingConfig.Footer;

export default function SocialLinks() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Gourmet Haven
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">Social Media</p>
      <div className="flex space-x-4">
        {socialLinks.map((link) => (
          <link.icon
            key={link.href}
            className="hover:text-5-color cursor-pointer text-gray-400"
          />
        ))}
      </div>
    </div>
  );
}
