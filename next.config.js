/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/graphql',
                destination: 'http://sunsetmeadow-admin.local/graphql',
            },
            {
                source: '/wp-json/:path*',
                destination: 'http://sunsetmeadow-admin.local/wp-json/:path*',
            },
        ];
    },
};

export default nextConfig;
