export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center w-full min-h-[90dvh] overflow-hidden bg-gray-100">
			<div className="relative w-40 h-40">
				<svg
					viewBox="0 0 100 100"
					className="w-full h-full drop-shadow-xl animate-spin"
				>
					{/* Pizza base */}
					<circle
						cx="50"
						cy="50"
						r="48"
						fill="url(#cheeseGradient)"
						stroke="#d97706"
						strokeWidth="2"
					/>

					{/* Crust */}
					<circle
						cx="50"
						cy="50"
						r="48"
						fill="none"
						stroke="#92400e"
						strokeWidth="4"
					/>

					{/* Pepperoni */}
					<circle cx="30" cy="35" r="6" fill="#ef4444" />
					<circle cx="60" cy="20" r="6" fill="#ef4444" />
					<circle cx="75" cy="55" r="6" fill="#ef4444" />
					<circle cx="40" cy="75" r="6" fill="#ef4444" />
					<circle cx="25" cy="60" r="6" fill="#ef4444" />

					{/* Herbs */}
					<circle cx="45" cy="30" r="2" fill="#22c55e" />
					<circle cx="68" cy="38" r="2" fill="#22c55e" />
					<circle cx="50" cy="80" r="2" fill="#22c55e" />
					<circle cx="20" cy="50" r="2" fill="#22c55e" />
					<circle cx="80" cy="70" r="2" fill="#22c55e" />

					{/* Cheese texture */}
					<circle cx="35" cy="40" r="1.5" fill="#fef3c7" opacity="0.7" />
					<circle cx="70" cy="65" r="1.5" fill="#fef3c7" opacity="0.7" />
					<circle cx="55" cy="25" r="1.5" fill="#fef3c7" opacity="0.7" />
					<circle cx="25" cy="70" r="1.5" fill="#fef3c7" opacity="0.7" />
					<circle cx="85" cy="40" r="1.5" fill="#fef3c7" opacity="0.7" />

					{/* Gradients */}
					<defs>
						<radialGradient
							id="cheeseGradient"
							cx="50%"
							cy="50%"
							r="50%"
							fx="50%"
							fy="50%"
						>
							<stop offset="0%" stopColor="#fbbf24" />
							<stop offset="100%" stopColor="#f59e0b" />
						</radialGradient>
					</defs>
				</svg>
			</div>
			<p className="mt-4 text-xl font-semibold text-amber-800">Loading...</p>
		</div>
	);
}
