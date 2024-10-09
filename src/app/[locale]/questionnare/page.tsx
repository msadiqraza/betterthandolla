// src/app/what-makes/page.tsx
import WhatMakesClient from "@/pages/QuestionnarePage";
import { Providers } from "@/Providers";
import { useTranslations } from "next-intl";

interface QuestionnaireData {
	heading: {
		a: string;
		b: string;
	};
	information: {
		a: string;
		b: string;
		list: {
			a: string;
			b: string;
			c: string;
			d: string;
		};
		c: string;
	};
	options: string[];
	navbar: {
		logo: string;
		buttonText: string;
	};
}

// Fetching data directly in the server component
export default function WhatMakesPage() {
	const t = useTranslations(""); // Initialize translations

	const questionnaireData: QuestionnaireData = {
		heading: {
			a: t("questionnare.heading.a"),
			b: t("questionnare.heading.b"),
		},
		information: {
			a: t("questionnare.information.a"),
			b: t("questionnare.information.b"),
			list: {
				a: t("questionnare.information.list.a"),
				b: t("questionnare.information.list.b"),
				c: t("questionnare.information.list.c"),
				d: t("questionnare.information.list.d"),
			},
			c: t("questionnare.information.c"),
		},
		options: [
			t("questionnare.options.0"),
			t("questionnare.options.1"),
			t("questionnare.options.2"),
			t("questionnare.options.3"),
		],
		navbar: {
			logo: t("questionnare.navbar.logo"),
			buttonText: t("questionnare.navbar.buttonText"),
		},
	};

	return (
		<Providers>
			<WhatMakesClient
				heading={questionnaireData.heading}
				information={
					questionnaireData.information
				}
				options={questionnaireData.options}
				navbar={questionnaireData.navbar}
			/>
		</Providers>
	);
}
