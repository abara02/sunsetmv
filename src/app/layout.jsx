import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from '../context/CartContext';
import { ShopProvider } from '../context/ShopContext';
import AgeGate from '../components/AgeGate';

export const metadata = {
    title: 'Sunset Meadow Vineyards',
    description: 'Welcome to Sunset Meadow Vineyards - Award-winning Connecticut wines.',
    icons: {
        icon: '/favicon_32x32.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <div className="site-wrapper" style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh' }}>
                    <ShopProvider>
                        <CartProvider>
                            <AgeGate />
                            <Navbar />
                            <CartDrawer />
                            <main>{children}</main>
                            <Footer />
                        </CartProvider>
                    </ShopProvider>
                </div>
            </body>
        </html>
    );
}
