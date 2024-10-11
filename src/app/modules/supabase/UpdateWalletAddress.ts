import { supabase } from "./supabaseClient"; // Make sure you import the initialized Supabase client

const updateWalletAddress = async (username: string, wallet:`0x${string}`) => {
	try {
		const { data, error } = await supabase
			.from("users") // Replace 'users' with the actual name of your table
			.update({ wallet }) // The value you're updating
			.eq("username", username); // Find the row where 'username' matches the given value

		if (error) {
			console.error(
				"Error updating user wallet address:",
				error
			);
			return null;
		}

		console.log("User wallet address updated:", data);
		return data;
	} catch (err) {
		console.error("Error executing update:", err);
		return null;
	}
};

export {updateWalletAddress}
// Example usage:
