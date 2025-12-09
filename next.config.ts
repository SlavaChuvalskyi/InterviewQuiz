import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        NEXT_PUBLIC_SUPABASE_URL: "https://scyrvikyachtrlkobphj.supabase.co",
        NEXT_PUBLIC_SUPABASE_PROJECT_ID: "scyrvikyachtrlkobphj",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_gSgGiWvnMiKrLyWwf-cLTA_BSAN_4KK",
        // TODO: fix when we merge this branch to master/production
        S3_PATH: process.env.NODE_ENV == 'development' ? 'http://jp-website-frontend-staging.s3-website-ap-southeast-2.amazonaws.com'
            : 'http://jp-website-frontend-staging.s3-website-ap-southeast-2.amazonaws.com',
    }
};

export default nextConfig;
