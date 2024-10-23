"use client";

// components/Layout.tsx
import "@/styles/globals.css";
import "@/styles/styles.css"
import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="h-screen w-screen lg:px-[7.5rem]">
			<div
				className={
					"font-light text-paragraph flex flex-col gap-10 py-5 px-4 lg:py-0 lg:px-0 lg:gap-0 lg:grid " +
					"lg:grid-cols-[0_5.5%_40.8%_3.7%_3.7%_40.8%_5.5%]  lg:grid-rows-[0_4.7%_14.2%_16.1%_40.7%_19.6%_4.7%] w-full min-h-full"
				}
			>
				{children}
			</div>
		</div>
	);
};

export default Layout;
