"use client";

// components/Layout.tsx
import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div
			className={
				" flex flex-col gap-20 py-5 px-4 lg:py-0 lg:px-0 lg:gap-0 lg:grid lg:grid-cols-[0_5.5%_40.8%_3.7%_3.7%_40.8%_5.5%]  lg:grid-rows-[0_4.7%_18.2%_11.9%_39.7%_20.6%_4.7%]  min-h-screen"
			}
		>
			{children}
		</div>
	);
};

export default Layout;
