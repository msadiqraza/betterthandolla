"use client";

// pages/price-stability.tsx
import Dots from "@/components/Dots";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import React from "react";
import { useRouter } from "../../i18n/routing";

// Define interfaces for the data structure
interface PriceStabilityData {
	heading: string;
	subheading: string;
	details: {
		a: string;
		b: string;
	};
	buttonText: string;
	post: string;
}

interface PriceStabilityProps {
	data: PriceStabilityData;
	navbar: {
		logo: string;
		buttonText: string;
	};
}

const PriceStabilityPage: React.FC<PriceStabilityProps> = ({
	data,
	navbar,
}) => {
	const router = useRouter();

	const handlePost = () => {
		router.push(`/rewards?posted=true`);

		console.log("Inside post");

		const twitterUrl = "https://twitter.com/intent/tweet";
		const postHref = `${twitterUrl}?text=${encodeURIComponent(
			data.post
		)}`;

		window.open(postHref, "_blank");
	};

	return (
		<Layout>
			<Navbar
				logo={navbar.logo}
				buttonText={navbar.buttonText}
				location="answer"
			/>
			<div className="col-start-3 col-end-7 row-start-3 row-end-7 text-center flex flex-col items-center justify-center">
				<h1 className="text-5xl font-semibold">
					{data.heading}
				</h1>
				<p className="text-5xl font-semibold mb-8">
					{data.subheading}
				</p>

				<div className="mb-8 max-w-[500px]">
					<div className="inline">
						{data.details.a}
							<Dots
								space={
									10
								}
								height={
									9
								}
								weight={
									9
								}
								style="items-center justify-center"
								colour=""
							/>
						{data.details.b}
					</div>
				</div>

				<button
					onClick={handlePost}
					className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-2xl font-semibold px-6 py-2 rounded-lg"
				>
					{data.buttonText}
				</button>
			</div>
		</Layout>
	);
};

export default PriceStabilityPage;
