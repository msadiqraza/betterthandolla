"use client";

import Dots from "@/components/Dots";
import Information from "@/components/Info";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Options from "@/components/Options";

// Interface for Information data structure
interface Information {
	a: string;
	b: string;
	list: {
		a: string;
		b: string;
		c: string;
		d: string;
	};
	c: string;
}

// Main props interface for the client component
interface WhatMakesProps {
	heading: {
		a: string;
		b: string;
	};
	information: Information;
	options: Array<string>;
	navbar: {
		logo: string;
		buttonText: string;
	};
}

// Client component to render the page layout
const WhatMakesClient = ({
	heading,
	information,
	options,
	navbar,
}: WhatMakesProps) => {
	return (
		<Layout>
			<Navbar
				logo={navbar.logo}
				buttonText={navbar.buttonText}
				location="questionnare"
			/>
			<div className="text-4xl font-bold flex flex-row w-full flex-wrap col-start-3 col-end-4 row-start-4 row-end-5">
				<div className="w-full">
					<div className="flex justify-start items-center gap-3 w-full">
						<p className="inline">
							{
								heading.a
							}
							{"  "}
						</p>
						<Dots
							space={6}
							height={
								14
							}
							weight={
								14
							}
							style="inline-flex justify-center items-center mt-2"
							colour=""
						/>
						<p className="inline">
							{
								heading.b
							}
						</p>
					</div>
				</div>
			</div>

			<Information info={information} />
			<Options opt={options} />
		</Layout>
	);
};

export default WhatMakesClient;
