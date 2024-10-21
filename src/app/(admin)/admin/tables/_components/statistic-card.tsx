import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function StatisticsCard({
	statisticTitle,
	statisticValue,
	icon,
}: {
	statisticTitle: string;
	statisticValue: number;
	icon: React.ReactNode;
}) {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-lg font-medium">{statisticTitle}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center">
					{icon}
					<span className="text-3xl font-bold">{statisticValue}</span>
				</div>
			</CardContent>
		</Card>
	);
}
