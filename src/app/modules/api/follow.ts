import axios from "axios";

const checkTwitterFollow = async (
	client_username: string
): Promise<boolean | number> => {
	try {
		console.log("Checking if follows user:", client_username);

		const response = await axios.get(
			`/api/follow?client_username=${encodeURIComponent(
				client_username
			)}`
		);

		console.log("Twitter API response:", response.data);

		return response.data.hasFollowed;
	} catch (error) {
		console.error("Error checking Twitter post:", error);
		return -1; // Return error code
	}
};

export default checkTwitterFollow;
