"use client";

import { createClient } from "@supabase/supabase-js";

// Prefer zsh env vars first, then NEXT_PUBLIC_* (from .env.local or Vercel)
const supabaseUrl =
  process.env.NEUR_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey =
  process.env.NEUR_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;


