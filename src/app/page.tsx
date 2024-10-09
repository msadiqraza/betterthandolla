"use client";

import english from "@/data/english.json";
import Home from "@/pages/HomePage";
import { Providers } from "@/Providers";

export default function HomePage(): JSX.Element {
	const data = english.home;

	return (
		<Providers>
			<Home data={data} />
		</Providers>
	);
}
