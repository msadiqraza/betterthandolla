"use client";

import { countUsers } from "@/modules/supabase/countUsers";
import React, { useEffect, useState } from "react";

interface CountUpTimerProps {
	subheading: string;
}

const CountUpTimer = ({ subheading }: CountUpTimerProps) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		// Fetch the total number of users
		const fetchUserCount = async () => {
			const totalUsers = await countUsers(); // Await the result from countUsers
			console.log("Total users:", totalUsers);

			if (totalUsers >= 0) {
				setCount(totalUsers); // Set the user count if valid
			} else {
				setCount(10); // Fallback count in case of an error
			}
		};

		fetchUserCount(); // Call the async function inside useEffect
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
			<p className="mt-4 text-center">{subheading}</p>
		</div>
	);
};

export { CountUpTimer };
