"use client";

import Dots from "@/components/Dots";
import Layout from "@/components/Layout";
import { useRouter } from "../../i18n/routing";

// Interface for the props
interface MissionCompleteProps {
	title: string;
	heading: string;
	subheading: string;
	buttonText: string;
}

interface MissionCompletePageProps {
	data: MissionCompleteProps;
}

const MissionCompletePage = ({ data }: MissionCompletePageProps) => {
	const router = useRouter();

	const handleButton = () => {
		router.push("/");
	};
	return (
		<Layout>
			<div className="mt-20 lg:mt-0 col-start-3 row-start-4 row-end-7 col-end-7 flex flex-col items-center justify-start">
				<div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-8 rounded-t-[30px] w-full max-w-xl">
						<div className="flex flex-col justify-center items-center w-full">
							<Dots
								space={
									26
								}
								weight={
									24
								}
								height={
									24
								}
								style="w-full min-h-[20px] justify-start ps-10"
								colour="bg-white"
							/>
							<h2 className="font-bold w-full text-center">
								{
									data.title
								}
							</h2>
						</div>
				</div>

				<div className="bg-white px-6 pb-6 pt-8 rounded-b-[30px] shadow-lg w-full max-w-xl">
					<h3 className=" font-bold mb-2">
						{data.heading}
					</h3>
					<p className="mb-4">
						{data.subheading
							.split(
								"\n"
							)
							.map(
								(
									line,
									index
								) => (
									<span
										key={
											index
										}
									>
										{
											line
										}
										<br />
									</span>
								)
							)}
					</p>
					<button
						onClick={
							handleButton
						}
						className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-9 py-2 rounded-lg"
					>
						{data.buttonText}
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default MissionCompletePage;
