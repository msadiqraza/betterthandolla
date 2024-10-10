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
	heading: string;
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
	countdownTimer: {
		time: {
			days: string;
			hours: string;
			minutes: string;
			seconds: string;
		};
	};
	footer: string;
	navbar: {
		logo: string;
		buttonText: string;
	};
}

interface RewardsData {
	rewardsData: BoostRewardsProps;
}

const BoostRewardsPage: React.FC<RewardsData> = ({ rewardsData }) => {
	const [hasPosted, setHasPosted] = useState(false);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const posted = params.get("posted") || "false";

		console.log("Posted", posted);
		if (posted === "true") setHasPosted(true);
	}, []);

	return (
		<Layout>
			<Navbar
				logo={rewardsData.navbar.logo}
				buttonText={
					rewardsData.navbar.buttonText
				}
				location="rewards"
			/>

			<h1 className="font-bold col-start-3 col-end-7 row-start-4 row-end-5 lg:col-end-4 text-3xl lg:text-4xl">
				{rewardsData.heading}
			</h1>

			<div className="col-start-3 col-end-7 row-start-5 row-end-5 lg:col-end-4 lg:row-end-7">
				<p className="mb-3">
					{rewardsData.details.a}
				</p>
				<p className="mb-2">
					{rewardsData.details.b}
					<ArrowForward />
				</p>
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
				<CountdownTimer
					time={
						rewardsData
							.countdownTimer
							.time
					}
				/>
				<h2 className="text-md text-center font-semibold mt-2">
					{rewardsData.footer}
				</h2>
			</div>
		</Layout>
	);
};

export default BoostRewardsPage;
