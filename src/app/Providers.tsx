"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { arbitrum, base, holesky, mainnet, sepolia } from "wagmi/chains";

const config = getDefaultConfig({
	appName: "BetterThanDollar",
	projectId: "a8bfd45ff108617b29ceef2d07f137ee",
	chains: [mainnet, base, arbitrum, sepolia, holesky],
	ssr: true,
});

const queryClient = new QueryClient();

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
