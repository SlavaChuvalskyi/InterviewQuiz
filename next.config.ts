import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        NEXT_PUBLIC_SUPABASE_URL: "",
        NEXT_PUBLIC_SUPABASE_PROJECT_ID: "",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
        // TODO: fix when we merge this branch to master/production
        S3_PATH: "",
    }
};

export default nextConfig;
