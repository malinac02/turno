import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://onguxyfmoofxaytmfhqs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZ3V4eWZtb29meGF5dG1maHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NzgzODQsImV4cCI6MjAxNzU1NDM4NH0.ZMWv8U4MMD2zq-d6PavO6PAkgr6WYzSpvw2_dqEvBrc";

export default feedSupabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});