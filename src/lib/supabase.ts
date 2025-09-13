import { createClient } from '@supabase/supabase-js'

// Environment detection with improved logic
const isLocalDevelopment =
  window.location.protocol === 'http:' ||
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

// Determine the correct Supabase URL based on environment
const getSupabaseUrl = () => {
  if (isLocalDevelopment) {
    return 'http://localhost:5173';
  }

  // For production hosted apps, we need to point to the Supabase Lite origin
  // even when the app is served from /app/northwind-app/ path
  const { protocol, hostname, port } = window.location;
  const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

  // If we're running under /app/* path, the Supabase API is at the root
  return baseUrl;
};

const supabaseUrl = getSupabaseUrl();

// For local development, we'll use a placeholder key since Supabase Lite doesn't require real keys
// For production, this would be the actual anon key
const supabaseAnonKey = isLocalDevelopment
  ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsaG9zdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQwOTk1MjAwLCJleHAiOjE5NTYzNTUyMDB9'
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByb2R1Y3Rpb24iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDk5NTIwMCwiZXhwIjoxOTU2MzU1MjAwfQ.placeholder';

console.log("🔍 Supabase Client Debug:", {
  isLocalDevelopment,
  currentUrl: window.location.href,
  supabaseUrl,
  protocol: window.location.protocol,
  hostname: window.location.hostname,
  pathname: window.location.pathname
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configure auth for both environments
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

export default supabase