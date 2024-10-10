"use client";

import { countUsers } from "@/modules/supabase/countUsers";
// pages/index.tsx
import React, { useEffect, useState } from "react";

interface CountUpTimerProps{
	subheading: string;
}
const CountUpTimer = ({ subheading }: CountUpTimerProps) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const totalUsers = countUsers()
		console.log("countUsers", totalUsers)
		if (!totalUsers) {
			setCount(10)
		}
	}, []);

	return (
		<div>
			<div className="flex justify-center space-x-2 text-4xl font-bold">
				{count
					.toString()
					.padStart(5, "0")
					.split("")
					.map((digit, index) => (
						<div
							key={
								index
							}
							className="bg-black text-white p-2 rounded"
						>
							{digit}
						</div>
					))}
			</div>
			<p className="mt-4 text-center">
				{subheading}
			</p>
		</div>
	);
};

export { CountUpTimer };
