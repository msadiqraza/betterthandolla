// src/app/what-makes/page.tsx
import english from "@/data/english.json";
import WhatMakesClient from "@/pages/QuestionnarePage";
import { Providers } from "@/Providers";
// Fetching data directly in the server component
export default function WhatMakesPage() {
	const heading = english.questionnare.heading;
	const information = english.questionnare.information;
	const options = english.questionnare.options;
	const navbar = english.navbar;

	return (
		<Providers>
			<WhatMakesClient
				heading={heading}
				information={information}
				options={options}
				navbar={navbar}
			/>
		</Providers>
	);
}
