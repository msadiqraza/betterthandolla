// app/api/getTweet/route.ts
import { NextRequest, NextResponse } from "next/server";
import en from "../../../../messages/en.json";

//change to send data from client

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const tweetId = searchParams.get("tweet_id") || "1838129689136714087"; // You can make this dynamic if needed.
	const clientUsername = en.rewards.rewardProgram.follow.clientTwitterAcct;

	const api_url = process.env.NEXT_RAPID_API_URL!;
	const api_key = process.env.NEXT_RAPID_API_KEY!;
	const api_host = api_url.replace(/^https:\/\//, "");

	const url = `${api_url}/tweet/${tweetId}`;

	const options = {
		method: "GET",
		headers: {
			"x-rapidapi-host": api_host,
			"x-rapidapi-key": api_key,
		},
	};

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const data = await response.json();

		const fullText =
			data.threaded_conversation_with_injections[0]
				.entries[0].content.itemContent
				.tweet_results.result.legacy.full_text;
		console.log("fullText:", typeof fullText, fullText);

		const hasPosted = fullText.includes(`@${clientUsername}`);

		return NextResponse.json(
			{ data: data, hasPosted: hasPosted },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching tweet:", error);
		return NextResponse.json(
			{ error: "Failed to fetch tweet" },
			{ status: 500 }
		);
	}
}
