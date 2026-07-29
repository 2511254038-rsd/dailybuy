import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "DailyBuy",
  description: "Your everyday online store",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}