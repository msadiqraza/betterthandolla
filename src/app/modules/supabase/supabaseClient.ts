import { createClient } from "@supabase/supabase-js";

// Use your Supabase project credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!; // Non-null assertion
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!; // Non-null assertion

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
