import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeamMemberCard({
  member,
}: {
  member: {
    name: string;
    role: string;
    image: string;
  };
}) {
  return (
    <div className="text-center">
      <Avatar className="border-template-one mx-auto mb-4 h-24 w-24 border-4">
        <AvatarImage src={member.image} alt={member.name} />
        <AvatarFallback>
          {member.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        {member.name}
      </h4>
      <p className="">{member.role}</p>
    </div>
  );
}
