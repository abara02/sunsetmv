/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const WP_BASE_URL = process.env.WP_BASE_URL || 'http://sunsetmeadow-admin.local';

        console.log('Using WordPress Base URL:', WP_BASE_URL);

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
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allows images from any HTTPS source, which is useful during domain transitions
            },
            {
                protocol: 'http',
                hostname: '**',
            }
        ],
    },
};

export default nextConfig;
