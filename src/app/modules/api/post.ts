import axios from "axios";

const checkTwitterPost = async (tweet_id:string): Promise<boolean | number> => {
	try {
		console.log(
			"Checking if follows user:",
			tweet_id
        );
        tweet_id= tweet_id.toString()

		const response = await axios.get(
			`/api/post?tweet_id=${encodeURIComponent(
				tweet_id 
			)}`
		);

		console.log("Twitter API post response:", response.data);

		return response.data.hasPosted;
	} catch (error) {
		console.error("Error checking Twitter post:", error);
		return -1; 
	}
};

export default checkTwitterPost;
