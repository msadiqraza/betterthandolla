"use client";

import { Providers } from "@/Providers";
import PriceStabilityPage from "@/pages/AnswerPage";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AnswerData {
	version: {
		[key: string]: {
			heading: string;
			subheading: string;
			details: {
				a: string;
				b: string;
			};
			buttonText: string;
			post: string;
		};
	};
	navbar: {
		logo: string;
		buttonText: string;
	};
}

export default function AnswerPage() {
	const t = useTranslations();
	const [option, setOption] = useState<string>("");
	const searchParams = useSearchParams();

	useEffect(() => {
		const selectedOption =
			searchParams.get("option") ||
			t("answer.version[1]");

		setOption(selectedOption);
	}, [searchParams, t]);

	const answerData: AnswerData = {
		version: {
			[option]: {
				heading: t(
					`answer.version.${option}.heading`
				),
				subheading: t(
					`answer.version.${option}.subheading`
				),
				details: {
					a: t(
						`answer.version.${option}.details.a`
					),
					b: t(
						`answer.version.${option}.details.b`
					),
				},
				buttonText: t(
					`answer.version.${option}.buttonText`
				),
				post: t(
					`answer.version.${option}.post`
				),
			},
		},
		navbar: {
			logo: t("answer.navbar.logo"),
			buttonText: t("answer.navbar.buttonText"),
		},
	};

	return (
		<Providers>
			<PriceStabilityPage
				navbar={answerData.navbar}
				data={answerData.version[option]}
			/>
		</Providers>
	);
}
