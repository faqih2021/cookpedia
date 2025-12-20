import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulcobjrrjvdkrkceezgw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsY29ianJyanZka3JrY2Vlemd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjA2NDUsImV4cCI6MjA4MTYzNjY0NX0.ee8Vb42begtgySSIVgZ-vBqgDhQ0y9LGURAoB2GKTZc';

// Debug log
console.log('Connecting to Supabase:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});