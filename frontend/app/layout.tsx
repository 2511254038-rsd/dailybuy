import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import MiniCartDrawer from "@/components/cart/MiniCartDrawer";
import "./globals.css";
import { ReactNode } from "react";
import { WishlistProvider } from "@/hooks/useWishlist";

export const metadata = {
  title: "DailyBuy",
  description: "Your everyday online store",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              {children}
              <Footer />
              <MiniCartDrawer />
              <Toaster position="top-center" />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}