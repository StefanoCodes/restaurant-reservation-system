import * as React from "react";
import { getReservationById } from "@/lib/data";
import {
	Body,
	Container,
	Column,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text,
	Tailwind,
} from "@react-email/components";
import { formatDateToString } from "@/lib/utils";
export default async function Email({
	reservationId,
}: {
	reservationId: string;
}) {
	const reservationDetails = await getReservationById(reservationId);
	if (!reservationDetails) return null;
	const { reservations, tables, users } = reservationDetails;
	return (
		<Html>
			<Head />
			<Preview>Your Reservation is Pending Confirmation</Preview>
			<Tailwind>
				<Body className="bg-gray-100 font-sans w-full">
					<Container className="mx-auto py-5 px-0 max-w-3xl">
						{/* LOGO */}
						<Section className="bg-white p-5 rounded-t-lg border-b border-gray-200">
							<Img
								src={`https://ik.imagekit.io/xmur8khex/restaurant_logo.png?updatedAt=1729088342659`}
								width={200}
								height={200}
								alt="Restaurant Logo"
								className="w-[200px] h-[200px] mx-auto aspect-square"
							/>
						</Section>
						{/* RESERVATION CONFIRMATION */}
						<Section className="bg-white px-8 rounded-b-lg">
							<Heading className="text-orange-500 text-2xl font-bold text-center mb-4">
								Reservation Confirmation
							</Heading>
							<Text className="text-gray-600 text-lg font-normal text-center mb-6">
								Pending Admin Approval
							</Text>
							{/* RESERVATION DETAILS */}
							<Section className="my-8 border-t border-b border-gray-200 py-6">
								<Row className="mb-2">
									<Column className="text-gray-500 w-2/5">
										Reservation ID:
									</Column>
									<Column className="text-gray-800 w-3/5 font-bold">
										{reservations.id}
									</Column>
								</Row>
								<Row className="mb-2">
									<Column className="text-gray-500 w-2/5">Status:</Column>
									<Column className="text-gray-800 w-3/5 capitalize font-bold">
										{reservations.status}
									</Column>
								</Row>
								<Row className="mb-2">
									<Column className="text-gray-500 w-2/5">
										Reservation Date:
									</Column>
									<Column className="text-gray-800 w-3/5 font-bold">
										{formatDateToString(reservations.reservationDate)}
									</Column>
								</Row>
								<Row className="mb-2">
									<Column className="text-gray-500 w-2/5">Start Time:</Column>
									<Column className="text-gray-800 w-3/5 font-bold">
										{reservations.startTime}
									</Column>
								</Row>
								<Row className="mb-2">
									<Column className="text-gray-500 w-2/5">Table:</Column>
									<Column className="text-gray-800 w-3/5 font-bold">
										{tables.name}
									</Column>
								</Row>
							</Section>
							{/* GREETING */}
							<Text className="text-base leading-relaxed text-gray-800">
								Dear {users.name},
							</Text>
							<Text className="text-base leading-relaxed text-gray-800">
								Thank you for your reservation. We're excited to confirm that
								your booking has been received and is currently pending admin
								approval. You'll receive another email once your reservation is
								confirmed.
							</Text>
							<Text className="text-base leading-relaxed text-gray-800">
								If you have any questions or need to make changes, please don't
								hesitate to contact us.
							</Text>
						</Section>
						<Section className="mt-5">
							<Text className="text-xs text-gray-500 text-center">
								© {new Date().getFullYear()} Your Restaurant Name. All rights
								reserved.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
