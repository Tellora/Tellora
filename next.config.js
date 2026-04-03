/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // Skip ESLint during production build — run separately via `npm run lint`
    // This avoids cross-platform circular JSON serialization issues in Next.js ESLint runner
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Skip TypeScript type checking during build — tsc runs separately
    typescript: {
        ignoreBuildErrors: false,
    },
};

module.exports = nextConfig;
