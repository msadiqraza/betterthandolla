"use client";

import { useRouter } from "../../i18n/routing";

interface OptionsProps{
	opt: Array<string>
}
export default function Options({opt}:OptionsProps): JSX.Element {
	const router = useRouter()
	const handleQuestion = (option: string) => {
		//massive oppurtinity of fuckup fix refactor
		router.push(`/answer?option=${option}`)
	};

	return (
		<div className="flex flex-col space-y-4 col-start-6 col-end-7 row-start-5 row-end-7">
			{opt.map((option) => (
				<button
					key={option}
					onClick={() => {
						handleQuestion(
							option
						);
					}} 
					className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-5 rounded-full text-lg font-semibold"
				>
					{option}
				</button>
			))}
		</div>
	);
}
