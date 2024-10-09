"use client";

// components/Layout.tsx
import Dots from "@/components/Dots";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";

interface NavbarProps {
	logo: string;
	buttonText: string;
}

const Navbar = ({ logo, buttonText }: NavbarProps) => {
	const { i18n } = useTranslation();

	const changeLanguage = (lng: string) => {
		console.log("Request for lang change", lng);
		i18n.changeLanguage(lng);
	};
	console.log(buttonText)

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
						onChange={(e) =>
							changeLanguage(
								e
									.target
									.value
							)
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
					{/* <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full">
						{buttonText}
					</button> */}
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
										: "Connect Wallet"}
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
