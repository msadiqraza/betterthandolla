// src/components/BoostRewardsPage.tsx (Client Component)
"use client";

import CountdownTimer from "@/components/CountDownTimer";
import Dots from "@/components/Dots";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import RewardProgram from "@/components/RewardsProgram";
import { ArrowForward } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

interface BoostRewardsProps {
	heading: {
		head: string;
		month: {
			a: string;
			b: string;
			c: string;
		};
	};
	details: {
		a: string;
		b: string;
		c: string;
		d: string;
		e: string;
	};
	rewardProgram: {
		heading: string;
		follow: {
			text: string;
			clientTwitterAcct: string;
			button: string;
		};
		post: {
			text: string;
			button: string;
		};
		verify: {
			placeholder: string;
			button: string;
		};
		sign: {
			text: string;
			button: string;
		};
		footer: string;
	};
	launchDate: string
	footer: string;
	navbar: {
		logo: string;
		buttonText: string;
	};
}

interface RewardsData {
	rewardsData: BoostRewardsProps;
}

type Value = {
	a: number;
	b: number;
	month: string;
};

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const BoostRewardsPage: React.FC<RewardsData> = ({ rewardsData }) => {
	const [hasPosted, setHasPosted] = useState(false);
	const [value, setValue] = useState<Value>({ a: 1, b: 0, month: "" });
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		
		const params = new URLSearchParams(window.location.search);
		const posted = params.get("posted") || "false";

		console.log("Posted", posted);
		if (posted === "true") setHasPosted(true);

		const currentMonth = new Date().getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
		const currentMonthName = monthNames[currentMonth];

		switch (currentMonth) {
			case 9: // October
				setValue({
					a: 3,
					b: 0,
					month: currentMonthName,
				});
				break;
			case 10: // November
				setValue({
					a: 2,
					b: 0,
					month: currentMonthName,
				});
				break;
			case 11: // December
				setValue({
					a: 1,
					b: 5,
					month: currentMonthName,
				});
				break;
			default:
				setValue({
					a: 1,
					b: 0,
					month: currentMonthName,
				});
				break;
		}
	}, []);

	  if (!isClient) {
			// Return a fallback while we wait for the client-side rendering to take over
			return null;
		}

	return (
		<Layout>
			<Navbar
				logo={rewardsData.navbar.logo}
				buttonText={
					rewardsData.navbar.buttonText
				}
				location="rewards"
			/>

			<div className="font-bold col-start-3 col-end-7 row-start-4 row-end-5 lg:col-end-4 text-3xl lg:text-4xl">
				{rewardsData.heading.head} x{" "}
				<div className="bg-black text-white inline">
					{value.a}
				</div>
				.
				<div className="bg-black text-white inline">
					{value.b}
				</div>
				!
			</div>

			<div className="col-start-3 col-end-7 row-start-5 row-end-5 lg:col-end-4 lg:row-end-7">
				<p className="mb-3">
					{rewardsData.details.a}
				</p>
				<div className="mb-3">
					{rewardsData.heading.month.a}
					<p className="font-bold inline">
						{value.month} 30
					</p>{" "}
					{rewardsData.heading.month.b}
					<Dots
						space={5}
						height={10}
						weight={10}
						style="justify-center items-center"
					/>
					{rewardsData.heading.month.c}{" "}
					x{value.a}.{value.b}
				</div>
				<div className="mb-2">
					{rewardsData.details.b}
					<ArrowForward />
				</div>
				<div className="mb-2">
					{rewardsData.details.c}
					<Dots
						space={5}
						height={10}
						weight={10}
						style="justify-center items-center"
					/>
					{rewardsData.details.d}
				</div>
				<p className="">
					{rewardsData.details.e}
				</p>
			</div>

			<div className=" col-start-3 col-end-7 row-start-6 row-end-7 lg:col-start-6 lg:row-start-5 lg:row-end-7">
				<RewardProgram
					posted={hasPosted}
					rewardsdata={
						rewardsData.rewardProgram
					}
				/>
			</div>

			<div className=" mb-10 row-start-7 row-end-8 col-start-3 col-end-7  lg:row-start-6 lg:row-end-8 flex justify-end items-center flex-col">
				<CountdownTimer launchDate={rewardsData.launchDate}	/>
				<h2 className="text-md text-center font-semibold mt-2">
					{rewardsData.footer}
				</h2>
			</div>
		</Layout>
	);
};

export default BoostRewardsPage;
