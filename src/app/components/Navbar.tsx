"use client";

// components/Layout.tsx
import Dots from "@/components/Dots";
import LanguageIcon from "@mui/icons-material/Language";
import { InputBase, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { styled } from "@mui/system";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarProps {
	logo: string;
	buttonText: string;
	location: string;
	onTextChange?: () => void;
}

const Navbar = ({ logo, buttonText, location, onTextChange }: NavbarProps) => {
	const router = useRouter();
	const localActive = useLocale();
	const [width, setWidth] = useState(0);

	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		onTextChange?.();
		setIsOpen(true);
	};

	const paddingValue = width < 550 ? "10px 14px" : "10px 20px";

	// Customizing the InputBase to remove the border and control styling
	const CustomSelect = styled(Select)(({}) => ({
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

	const customMenuProps = {
		PaperProps: {
			style: {
				backgroundColor:
					"rgba(255, 255, 255, 0.5)",
				borderRadius: "14px",
			},
		},
	};

	const onSelectChange = (event: SelectChangeEvent<unknown>) => {
		const nextLocale = event.target.value;

		router.replace(`/${nextLocale}/${location}`); // Update locale
	};

	useEffect(() => {
		setWidth(document.documentElement.scrollWidth);
	}, []);

	return (
		<nav className="col-start-2 col-end-8 row-start-3 row-end-4 overflow-visible">
			<div className="w-full  flex flex-row justify-between">
				{width < 550 ? (
					<div className="flex flex-col">
						<Dots
							space={24}
							height={
								11
							}
							weight={
								11
							}
							style=""
							colour=""
						/>
						<Link href="/">
							<p>
								{
									logo
								}
							</p>
						</Link>
					</div>
				) : (
					<div className="flex flex-col">
						<Dots
							space={26}
							height={
								10
							}
							weight={
								10
							}
							style=""
							colour=""
						/>
						<Link href="/">
							<p>
								{
									logo
								}
							</p>
						</Link>
					</div>
				)}

				<div
					className={`flex items-center space-x-1 md:space-x-4 `}
				>
					{/* <Select
						value={
							width >
							550
								? localActive
								: undefined
						}
						onChange={
							onSelectChange
						}
						open={isOpen}
						onClose={() =>
							setIsOpen(
								false
							)
						}
						onOpen={handleOpen}
						// onClick={onTextChange}
						IconComponent={
							LanguageIcon
						} // Use LanguageIcon from MUI
						input={
							<InputBase />
						}
						MenuProps={{
							PaperProps: {
								style: {
									backgroundColor:
										"#e0f7fa", // Light blue background for the dropdown
									borderRadius: "12px", // Rounded corners
									padding: "10px",
								},
							},
						}}
						sx={{
							"& .MuiSelect-select":
								{
									padding: "10px", // Adjust padding for the selected item
									color: "black",
								},
							"& .MuiSvgIcon-root":
								{
									color: "red", // Change the color of the Language icon if needed
								},
							"& .MuiPaper-root":
								{
									borderRadius: "12px", // Rounded corners for the dropdown box
								},
						}}
					>
						<MenuItem
							value="en"
							style={{
								color:
									localActive ===
									"en"
										? "red"
										: "inherit",
								backgroundColor:
									localActive ===
									"en"
										? "#ffffff"
										: "transparent",
								borderRadius: "8px",
								margin: "8px 0",
							}}
						>
							English
						</MenuItem>
						<MenuItem
							value="pt"
							style={{
								color:
									localActive ===
									"pt"
										? "red"
										: "inherit",
								backgroundColor:
									localActive ===
									"pt"
										? "#ffffff"
										: "transparent",
								borderRadius: "8px",
								margin: "8px 0",
							}}
						>
							Portuguese
						</MenuItem>
						<MenuItem
							value="zh"
							style={{
								color:
									localActive ===
									"zh"
										? "red"
										: "inherit",
								backgroundColor:
									localActive ===
									"zh"
										? "#ffffff"
										: "transparent",
								borderRadius: "8px",
								margin: "8px 0",
							}}
						>
							Mandarin
						</MenuItem>
						<MenuItem
							value="hi"
							style={{
								color:
									localActive ===
									"hi"
										? "red"
										: "inherit",
								backgroundColor:
									localActive ===
									"hi"
										? "#ffffff"
										: "transparent",
								borderRadius: "8px",
								margin: "8px 0",
							}}
						>
							Hindi
						</MenuItem>
						<MenuItem
							value="ru"
							style={{
								color:
									localActive ===
									"ru"
										? "red"
										: "inherit",
								backgroundColor:
									localActive ===
									"ru"
										? "#ffffff"
										: "transparent",
								borderRadius: "8px",
								margin: "8px 0",
							}}
						>
							Russian
						</MenuItem>
					</Select> */}

					<CustomSelect
						value={
							width >
							550
								? localActive
								: undefined
						}
						onChange={
							onSelectChange
						}
						open={isOpen}
						onClose={() =>
							setIsOpen(
								false
							)
						}
						onOpen={handleOpen}
						MenuProps={
							customMenuProps
						}
						IconComponent={
							LanguageIcon
						}
						input={
							<InputBase />
						}
					>
						<MenuItem
							value="en"
							style={{
								color:
									localActive ===
									"en"
										? "red"
										: "inherit",
							}}
						>
							English
						</MenuItem>
						<MenuItem
							value="pt"
							style={{
								color:
									localActive ===
									"pt"
										? "red"
										: "inherit",
							}}
						>
							Portuguese
						</MenuItem>
						<MenuItem
							value="zh"
							style={{
								color:
									localActive ===
									"zh"
										? "red"
										: "inherit",
							}}
						>
							Mandarin
						</MenuItem>
						<MenuItem
							value="hi"
							style={{
								color:
									localActive ===
									"hi"
										? "red"
										: "inherit",
							}}
						>
							Hindi
						</MenuItem>
						<MenuItem
							value="ru"
							style={{
								color:
									localActive ===
									"ru"
										? "red"
										: "inherit",
							}}
						>
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
										background: "linear-gradient(to right, #ef4444, #ec4899, #ef4444)",
										color: "#fff",
										padding: paddingValue,
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
