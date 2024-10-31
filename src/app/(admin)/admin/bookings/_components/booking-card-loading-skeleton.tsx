import { Skeleton } from "@/components/ui/skeleton";
const SkeletonCard = () => {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[150px] w-[300px] rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[300px]" />
				<Skeleton className="h-4 w-[300px]" />
			</div>
		</div>
	);
};
export default function BookingCardLoadingSkeleton() {
	return (
		<div className="flex flex-col sm:flex-row gap-4 flex-wrap">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	);
}
