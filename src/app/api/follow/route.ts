// app/api/getTweet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { convertUsernameToUserId } from "@/modules/convertUsernameToUserId";
import english from "@/data/english.json"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    // const userId = searchParams.get("tweet_id") || "3190865591"; // Default if no tweet_id is provided
    const client_username = searchParams.get("client_username") || "blackstar_defi"
    const host_username = english.rewards.rewardProgram.follow.clientTwitterAcct

	const api_url = process.env.NEXT_RAPID_API_URL || "";
    const api_key = process.env.NEXT_RAPID_API_KEY || "";
    const api_host = api_url.replace(/^https:\/\//, "");

    const userId = await convertUsernameToUserId(client_username);

	const url = `${api_url}/user/${userId}/followings?count=1000`;

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

		const instructions =
			data.user?.result?.timeline?.timeline
				?.instructions;
		if (!instructions || instructions.length < 4) {
			// Return an empty response if there are no valid entries
			return NextResponse.json(
				{ followers: [] },
				{ status: 200 }
			);
		}

		const entries = instructions[3].entries;

		const usernames: string[] = [];

		for (let i = 0; i < entries.length; i++) {
			if ("itemContent" in entries[i].content) {
				const username =
					entries[i].content.itemContent
						.user_results.result
						.legacy.screen_name;
				usernames.push(username);
			}
        }
        
        const hasFollowed = usernames.includes(host_username)

		if (usernames.length === 0) {
			return NextResponse.json(
				{
					message: "No valid user names found",
				},
				{ status: 200 }
			);
		}

		// Successfully return the usernames
		return NextResponse.json(
            { followers: usernames , hasFollowed:hasFollowed},
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
