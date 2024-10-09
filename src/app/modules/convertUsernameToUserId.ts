export const convertUsernameToUserId = async (username: string) => {
	const api_url = process.env.NEXT_RAPID_API_URL!;
	const apiHost = api_url.replace(/^https:\/\//, "");
	const apiKey = process.env.NEXT_RAPID_API_KEY!;

	const apiUrl = `${api_url}/username/to/id/${username}`;

	if (username === "blackstar_defi") {
		return "1836007234012385280";
	}

	const response = await fetch(apiUrl, {
		method: "GET",
		headers: {
			"x-rapidapi-host": apiHost,
			"x-rapidapi-key": apiKey,
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.statusText}`);
	}

	const data = await response.json();
	return data.user_id; // Returns the user ID
};
