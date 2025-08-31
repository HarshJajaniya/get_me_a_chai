/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}` // On Vercel → use deployed domain
      : "http://localhost:3000", // Locally → use localhost
  },
};

export default nextConfig;
