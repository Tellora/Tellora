/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",       // Static HTML export disabled for dev - enable only for production builds
    trailingSlash: true,    // Ensures index.html is generated for every route
    images: {
        unoptimized: true,    // next/image optimisation is server-side; disable for static export
    },
};

module.exports = nextConfig;
