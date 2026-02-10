/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const WP_BASE_URL = process.env.WP_BASE_URL;

        if (!WP_BASE_URL) {
            throw new Error("Missing WP_BASE_URL environment variable");
        }

        return [
            {
                source: "/graphql",
                destination: `${WP_BASE_URL}/graphql`,
            },
            {
                source: "/wp-json/:path*",
                destination: `${WP_BASE_URL}/wp-json/:path*`,
            },
        ];
    },
};

export default nextConfig;
