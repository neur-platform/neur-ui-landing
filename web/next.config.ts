import type { NextConfig } from "next";

// Map your zsh env vars (NEUR_*) to the public Next.js vars the client reads
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEUR_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEUR_SUPABASE_ANON_KEY,
  },
};

export default nextConfig;
