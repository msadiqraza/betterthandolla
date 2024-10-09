"use client";

// pages/index.tsx
import React, { useEffect, useState } from "react";

interface CountUpTimerProps{
	subheading: string;
}
const CountUpTimer = ({ subheading }: CountUpTimerProps) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCount((prevCount) => prevCount + 1);
		}, 100); // Increase every 100ms for a faster effect

		return () => clearInterval(timer);
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
