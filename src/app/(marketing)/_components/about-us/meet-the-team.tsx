import { Card } from "@/components/ui/card";
import TeamMemberCard from "./team-member-card";
import { marketingConfig } from "@/app/(marketing)/marketing.config";
const { teamMembers } = marketingConfig.AboutUs;
export default function MeetTeam() {
  return (
    <div className="relative lg:w-1/2">
      <div className="absolute inset-0 rotate-3 rounded-3xl bg-primary-brand-color"></div>
      <Card className="relative rounded-3xl border-none bg-white p-8 shadow-xl dark:bg-gray-800">
        <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Meet Our Team
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </Card>
    </div>
  );
}
