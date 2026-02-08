import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from '../context/CartContext';
import { ShopProvider } from '../context/ShopContext';

export const metadata = {
    title: 'Sunset Meadow Vineyards',
    description: 'Welcome to Sunset Meadow Vineyards - Award-winning Connecticut wines.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ShopProvider>
                    <CartProvider>
                        <Navbar />
                        <CartDrawer />
                        <main>{children}</main>
                        <Footer />
                    </CartProvider>
                </ShopProvider>
            </body>
        </html>
    );
}
