import { supabase } from "@/modules/supabase/supabaseClient";

async function insertUser(username: string, wallet: `0x${string}`, tweetId: number | null): Promise<boolean> {
	const { data, error } = await supabase
		.from("users") // Table name
		.insert([{ username: username, wallet: wallet, tweetid: tweetId }]) // Data to insert
		.select();

	if (error) {
		console.log("Error inserting data:", error.message);
		return false;
	} else {
		console.log("Data inserted successfully:", data);
		return true;
	}
}

export { insertUser };
