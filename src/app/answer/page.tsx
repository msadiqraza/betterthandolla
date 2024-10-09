"use client";

import english from "@/data/english.json";
import PriceStabilityPage from "@/pages/AnswerPage";
import { Providers } from "@/Providers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define a type for the valid options
type ValidOptions = keyof typeof english.answer.version;

// 	"PRICE STABILITY": {
// 		heading: string;
// 		subheading: string;
// 		details: { a: string; b: string };
// 		buttonText: string;
// 		post: string;
// 	};
// 	"SHARED STABILITY": {
// 		heading: string;
// 		subheading: string;
// 		details: { a: string; b: string };
// 		buttonText: string;
// 		post: string;
// 	};
// 	"CENSORSHIP RESISTANCE": {
// 		heading: string;
// 		subheading: string;
// 		details: { a: string; b: string };
// 		buttonText: string;
// 		post: string;
// 	};
// 	"NEUTRAL": {
// 		heading: string;
// 		subheading: string;
// 		details: { a: string; b: string };
// 		buttonText: string;
// 		post: string;
// 	};
// };

export default function AnswerPage() {
	const [option, setOption] = useState<ValidOptions>("PRICE STABILITY");
	const searchParams = useSearchParams();

	// Load translations using the custom hook
	// const t = useTranslations();
	const nav = english.navbar;

	useEffect(() => {
		const selectedOption =
			(searchParams.get("option") as ValidOptions) ||
			"PRICE STABILITY";
		setOption(selectedOption);
	}, [searchParams]);

	const data = english.answer.version[option];

	return (
		<Providers>
			<PriceStabilityPage navbar={nav} data={data} />
		</Providers>
	);
}
