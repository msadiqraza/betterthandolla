// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				pink: {
					500: "#ff1493",
				},
				red: {
					500: "#ff0000",
				},
			},
		},
	},
	plugins: [],
};

export default config;
