"use client";

// pages/boost-rewards.tsx
import React, { useState, useEffect } from "react";
interface CountdownTimerProps {
		time: {
			days: string;
			hours: string;
			minutes: string;
			seconds: string;
		};
};
	
const CountdownTimer: React.FC<CountdownTimerProps> = ({ time }) => {
 const transformedTime = {
		days: Number(time.days),
		hours: Number(time.hours),
		minutes: Number(time.minutes),
		seconds: Number(time.seconds),
 };


	const [timeLeft, setTimeLeft] = useState(transformedTime);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime.seconds > 0) {
					return {
						...prevTime,
						seconds:
							prevTime.seconds -
							1,
					};
				} else if (prevTime.minutes > 0) {
					return {
						...prevTime,
						minutes:
							prevTime.minutes -
							1,
						seconds: 59,
					};
				} else if (prevTime.hours > 0) {
					return {
						...prevTime,
						hours:
							prevTime.hours -
							1,
						minutes: 59,
						seconds: 59,
					};
				} else if (prevTime.days > 0) {
					return {
						...prevTime,
						days:
							prevTime.days -
							1,
						hours: 23,
						minutes: 59,
						seconds: 59,
					};
				} else {
					clearInterval(timer);
					return prevTime;
				}
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex space-x-4 justify-center">
			{Object.entries(timeLeft).map(([unit, value]) => (
				<div key={unit} className="text-center">
					<div className="bg-black text-white text-2xl font-bold p-2 rounded">
						{value
							.toString()
							.padStart(
								2,
								"0"
							)}
					</div>
					<div className="text-xs uppercase mt-1">
						{unit}
					</div>
				</div>
			))}
		</div>
	);
};

export default CountdownTimer