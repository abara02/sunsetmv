/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/graphql',
                destination: `${process.env.WORDPRESS_URL}/graphql`,
            },
            {
                source: '/wp-json/:path*',
                destination: `${process.env.WORDPRESS_URL}/wp-json/:path*`,
            },
        ];
    },
};

export default nextConfig;
