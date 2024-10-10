"use client";

// components/Layout.tsx
import Dots from "@/components/Dots";
import LanguageIcon from "@mui/icons-material/Language";
import { MenuItem, Select, SelectChangeEvent, InputBase } from "@mui/material";
import { styled } from "@mui/system";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";

interface NavbarProps {
	logo: string;
	buttonText: string;
	location: string;
}

const Navbar = ({ logo, buttonText, location }: NavbarProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const localActive = useLocale();

	// Customizing the InputBase to remove the border and control styling
	const CustomSelect = styled(Select)(({ theme }) => ({
		".MuiSelect-icon": {
			color: "red", // Change icon color to red
			paddingLeft: "2px", // Add space between value and icon
		},
		"& .MuiOutlinedInput-notchedOutline": {
			border: "none", // Remove border
		},
		"&:hover .MuiOutlinedInput-notchedOutline": {
			border: "none", // Remove hover border (if applicable)
		},
		"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
			border: "none", // Remove focused border (if applicable)
		},
	}));

	const onSelectChange = (event: SelectChangeEvent<unknown>, child: ReactNode) => {
		const nextLocale = event.target.value;

		startTransition(() => {
			router.replace(`/${nextLocale}/${location}`); // Update locale
		});
	};

	return (
		<nav className="col-start-3 col-end-7 row-start-3 row-end-4">
			<div className="w-full  flex flex-row justify-between">
				<div className="flex flex-col">
					<Dots
						space={25}
						height={10}
						weight={10}
						style=""
						colour=""
					/>
					<span className="text-lg">
						{logo}
					</span>
				</div>

				<div className="flex items-center space-x-4">
					<CustomSelect
						value={localActive}
						onChange={
							onSelectChange
						}
						IconComponent={
							LanguageIcon
						} // Use LanguageIcon from MUI
						input={
							<InputBase />
						}
					>
						<MenuItem value="en">
							English
						</MenuItem>
						<MenuItem value="pt">
							Portuguese
						</MenuItem>
						<MenuItem value="zh">
							Mandarin
						</MenuItem>
						<MenuItem value="hi">
							Hindi
						</MenuItem>
						<MenuItem value="ru">
							Russian
						</MenuItem>
					</CustomSelect>

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
										borderRadius: "10px",
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
