import { CountUpTimer } from "@/components/CountUpTimer";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { useRouter } from "../../i18n/routing";
import ResponsiveHeader from "@/components/ResponsiveText";

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
				location=""
			/>

			<main className="col-start-3 col-end-7 row-start-4 row-end-6 flex justify-start items-center flex-col text-center">
				{/* <ResponsiveHeader className="inline-block  font-bold w-lg max-w-xl pb-4">
					{data.heading.a}{" "}
					{data.heading.b}{" "}
					{data.heading.c}
				</ResponsiveHeader> */}

				<div className="max-w-xl ">
					<ResponsiveHeader className="inline-block font-[600] min-w-[415px] pb-4">
						{data.heading.a}{" "}
						{data.heading.b}{" "}
						{data.heading.c}
					</ResponsiveHeader>
				</div>

				<p className="mb-5 text-paragraph max-w-lg">
					{data.subheading.a}{" "}
					{data.subheading.b}
				</p>
				<button
					onClick={handleRoute}
					className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-lg "
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
