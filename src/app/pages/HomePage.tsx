import { CountUpTimer } from "@/components/CountUpTimer";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import english from "@/data/english.json";
import { GetStaticProps } from "next";
import { useRouter } from "next/navigation";

// Interface for the props
interface HomeProps {
	heading: {
		a: string;
		b: string;
		c: string;
	};
	subheading: {
		a: string;
		b: string;
	};
	buttonText: string;
	countUpTimer: {
		subheading: string;
	};
	navbar: {
		logo: string;
		buttonText: string;
	};
}

interface HomePageProps {
	data: HomeProps;
}

function Home({ data }: HomePageProps): JSX.Element {
	const router = useRouter();

	const handleRoute = () => {
		console.log("pushing for rewards");
		router.push("/rewards");
	};

	return (
		<Layout>
			<Navbar
				logo={data.navbar.logo}
				buttonText={data.navbar.buttonText}
			/>

			<main className="col-start-3 col-end-7 row-start-4 row-end-6 flex justify-start items-center flex-col text-center">
				<div className="text-4xl font-bold pb-4">
					<p>{data.heading.a}</p>
					<p>{data.heading.b}</p>
					<p>{data.heading.c}</p>
				</div>
				<div className="mb-5">
					<p>{data.subheading.a}</p>
					<p>{data.subheading.b}</p>
				</div>
				<button
					onClick={handleRoute}
					className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full hover:-mt-1 hover:h-[46px] hover:w-[128px]"
				>
					{data.buttonText}
				</button>
			</main>

			<div className="col-start-3 col-end-7 row-start-6 row-end-7">
				<CountUpTimer
					subheading={
						data.countUpTimer
							.subheading
					}
				/>
			</div>
		</Layout>
	);
}


export default Home;
