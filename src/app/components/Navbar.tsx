"use client";

// components/Layout.tsx
import Dots from "@/components/Dots";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

interface NavbarProps {
	logo: string;
	buttonText: string;
	location: string;
}

const Navbar = ({ logo, buttonText, location }: NavbarProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const localActive = useLocale();

	const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const nextLocale = e.target.value;

		startTransition(() => {
			router.replace(`/${nextLocale}/${location}`); // Update locale
		});
	};

	return (
		<nav className="col-start-3 col-end-7 row-start-3 row-end-4">
			<div className="w-full  flex flex-row justify-between">
				<div className="flex flex-col">
					<Dots
						space={26}
						height={10}
						weight={10}
						style=""
						colour=""
					/>
					<span className="font-bold text-xl">
						{logo}
					</span>
				</div>

				<div className="flex items-center space-x-4">
					<select
						className="bg-transparent"
						value={localActive}
						onChange={
							onSelectChange
						}
					>
						<option value="en">
							English
						</option>
						<option value="pt">
							Portuguese
						</option>
						<option value="zh">
							Mandarin
						</option>
						<option value="hi">
							Hindi
						</option>
						<option value="ru">
							Russian
						</option>
					</select>

					<ConnectButton.Custom>
						{({
							account,
							openConnectModal,
							openAccountModal,
							mounted,
						}) => {
							const connected =
								mounted &&
								account;
							return (
								<button
									onClick={
										connected
											? openAccountModal // If connected, show the account modal
											: openConnectModal // Otherwise, open the connect modal
									}
									style={{
										background: "linear-gradient(to right, #ec4899, #ef4444)",
										color: "#fff",
										padding: "10px 20px",
										borderRadius: "999px",
									}}
								>
									{connected
										? `${account.displayName}` // Display the wallet address if connected
										: buttonText}
								</button>
							);
						}}
					</ConnectButton.Custom>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
