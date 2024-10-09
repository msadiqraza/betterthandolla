import english from "@/data/english.json";
import MissionCompletePage from "@/pages/FinishedPage";
import { Providers } from "@/Providers";

export default function FinishedPage() {
	const data = english.finished;

	return (
		<Providers>
			<MissionCompletePage data={data} />
		</Providers>
	);
}
