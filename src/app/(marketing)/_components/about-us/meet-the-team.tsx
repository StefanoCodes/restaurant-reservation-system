import { Card } from "@/components/ui/card";
import TeamMemberCard from "./team-member-card";
import { marketingConfig } from "@/app/(marketing)/marketing.config";
const { teamMembers } = marketingConfig.AboutUs;
export default function MeetTeam() {
  return (
    <div className="relative w-full lg:w-1/2">
      <div className="bg-template-one absolute inset-0 rotate-3 rounded-3xl"></div>
      <Card className="relative rounded-3xl border-none bg-white p-8 shadow-xl dark:bg-gray-800">
        <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-center">
          Meet Our Team
        </h3>
        <div className="flex flex-col gap-8 sm:mx-auto sm:max-w-xl sm:flex-row sm:items-center sm:justify-between">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </Card>
    </div>
  );
}
