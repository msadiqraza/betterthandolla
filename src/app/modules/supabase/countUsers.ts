import { supabase } from "@/modules/supabase/supabaseClient";

// Function to check if a user exists by username or wallet
const countUsers = async (): Promise<number> => {
	try {
		// Query the users table to find a user by username or wallet
		const { data, error } = await supabase
			.from("users")
			.select("*", { count: "exact", head: true });

		if (error) {
			console.error(
				"Error fetching user:",
				error.message
			);
			return -1;
		}

		// Check if any users were found
		if (data.length > 0) {
			console.log("User found:", data);
			return 1; // Return the first matched user
		} else {
			console.log(
				"No user found with the provided username or wallet."
			);
			return 0; // No user found
		}
	} catch (error) {
		console.log("Error during user search:", error);
		return -2;
	}
};

export { countUsers };
