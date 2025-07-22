import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://koekiktgbzoiyckwheox.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZWtpa3RnYnpvaXlja3doZW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NzAzMzUsImV4cCI6MjA2ODU0NjMzNX0.3I38_OXCLzXgYGA9azsqr2xFqLj_zGFJBQZ3PBSaf08";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
