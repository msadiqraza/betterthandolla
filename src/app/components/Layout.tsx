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
				"grid  grid-cols-[0_5.5%_40.8%_3.7%_3.7%_40.8%_5.5%]  grid-rows-[0_4.7%_18.2%_11.9%_39.7%_20.6%_4.7%]  min-h-screen"
			}
		>
			{children}
		</div>
	);
};

export default Layout;
