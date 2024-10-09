// src/app/rewards/page.tsx (Server Component)
import english from "@/data/english.json";
import BoostRewardsPage from "@/pages/RewardsPage";
import { Providers } from "@/Providers";

export default function RewardsPage() {
	// Fetch data on the server side
	const rewardsData = english.rewards;

	// Render the client-side component with fetched data as props
	return (
		<Providers>
			<BoostRewardsPage rewardsData={rewardsData} />
		</Providers>
	);
}
