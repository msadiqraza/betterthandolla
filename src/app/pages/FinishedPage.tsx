import Dots from "@/components/Dots";
import Layout from "@/components/Layout";

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
	return (
		<Layout>
			<div className="col-start-3 row-start-4 row-end-7 col-end-7 flex flex-col items-center justify-start">
				<div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-t-2xl w-full max-w-md">
					<div className="flex flex-col justify-center items-center">
						<div>
							<Dots
								space={
									2
								}
								weight={
									4
								}
								height={
									4
								}
								style="w-full min-h-[20px] justify-start gap-14"
								colour="bg-white"
							/>
							<h1 className="text-3xl font-bold text-center">
								{
									data.title
								}
							</h1>
						</div>
					</div>
				</div>
				<div className="bg-white px-6 pb-6 pt-4 rounded-b-2xl shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-bold mb-2">
						{data.heading}
					</h2>
					<p className="mb-4">
						{data.subheading}
					</p>
					<button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-9 py-2 rounded-xl">
						{data.buttonText}
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default MissionCompletePage;
