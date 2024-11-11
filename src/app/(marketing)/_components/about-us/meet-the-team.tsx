import TeamMemberCard from "./team-member-card";

const teamMembers = [
  {
    name: "Jason Chen",
    role: "Head Chef",
    image: "/blake.webp",
  },
  {
    name: "Michael Roberts",
    role: "Sommelier",
    image: "/daniel.webp",
  },
  {
    name: "John Johnson",
    role: "Pastry Chef",
    image: "/dan.webp",
  },
];

export default function MeetTeam() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <TeamMemberCard key={member.name} member={member} />
      ))}
    </div>
  );
}
