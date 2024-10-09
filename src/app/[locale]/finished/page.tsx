import MissionCompletePage from "@/pages/FinishedPage";
import { Providers } from "@/Providers";
import { useTranslations } from "next-intl";

interface FinishedData {
	title: string;
	heading: string;
	subheading: string;
	buttonText: string;
}

export default function FinishedPage() {
	const t = useTranslations("finished"); // Initialize translations

	const finishedData: FinishedData = {
		title: t("title"),
		heading: t("heading"),
		subheading: t("subheading"),
		buttonText: t("buttonText"),
	};

	return (
		<Providers>
			<MissionCompletePage data={finishedData} />
		</Providers>
	);
}
