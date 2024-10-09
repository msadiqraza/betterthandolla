import { ApifyClient } from "apify-client";
import { NextResponse } from "next/server";

// Initialize Apify Client
const client = new ApifyClient({
	token: process.env.NEXT_APIFY_POST_KEY,
});

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	let username = searchParams.get("username") || "blackstar_defi";

	try {
		if (username.includes("@"))
			username = username.replace("@", "");

		console.log("actor alive", typeof username, username);

		const result = await client
			.actor("gentle_cloud/twitter-tweets-scraper")
			.call({
				result_count: "1",
				since_date: "2024-06-01",
				start_urls: [
					{
						url: `https://twitter.com/${username}`,
					},
				],
			});

		const { items } = await client
			.dataset(result.defaultDatasetId)
			.listItems();
		const text = items[0]?.full_text ?? "";

		console.log("text", typeof text);
		console.dir(text);

		if (
			typeof text === "string" &&
			text.includes("@SkyEcosystem")
		) {
			return NextResponse.json({
				hasPosted: true,
			});
		} else {
			return NextResponse.json({
				hasPosted: false,
			});
		}
	} catch (error) {
		console.error("Error during batch processing:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 }
		);
	}
}
