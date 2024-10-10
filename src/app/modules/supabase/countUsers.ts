import { supabase } from "@/modules/supabase/supabaseClient";

// Function to count the total number of users
const countUsers = async (): Promise<number> => {
	try {
		// Query the users table to count all rows
		const { count, error } = await supabase
			.from("users")
			.select("*", { count: "exact", head: true }); // This fetches only the count, not the data itself

		if (error) {
			console.error(
				"Error fetching user count:",
				error.message
			);
			return -1; // Return -1 on error
        }
        
        console.log("count", count)

		return count || 0; // Return the count, or 0 if no users exist
	} catch (error) {
		console.log("Error during user count:", error);
		return -2; // Return -2 on unexpected error
	}
};

export { countUsers };
