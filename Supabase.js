import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://onguxyfmoofxaytmfhqs.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZ3V4eWZtb29meGF5dG1maHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NzgzODQsImV4cCI6MjAxNzU1NDM4NH0.ZMWv8U4MMD2zq-d6PavO6PAkgr6WYzSpvw2_dqEvBrc";
const SUPABASE_URL= "https://mkdaoilcthudkfmkkhuo.supabase.co"
const SUPABASE_ANON_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZGFvaWxjdGh1ZGtmbWtraHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3NDE4NDEsImV4cCI6MjAyMjMxNzg0MX0.l58T8TLUZ6_T-969M-BiCBxosdIBzhDA-swiSSRTTnc"
const newSecretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZGFvaWxjdGh1ZGtmbWtraHVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjc0MTg0MSwiZXhwIjoyMDIyMzE3ODQxfQ.JgC1k-IoEwMCHXhMPY3gXAKpxqJX5XIyct8uZJRQVhk'

export default supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
