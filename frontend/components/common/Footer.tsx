import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-white font-bold text-lg mb-2">DailyBuy</h3>

          <p className="text-sm text-gray-400 leading-relaxed">
            Your everyday online store — quality products, fast delivery,
            and a shopping experience you can trust.
          </p>

          <div className="flex gap-3 mt-4">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
            >
              <FaFacebook size={16} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
            >
              <FaYoutube size={16} />
            </a>
          </div>
        </div>

        {/* Service */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Service</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="hover:text-white">
                All Products
              </Link>
            </li>

            <li>
              <Link href="/cart" className="hover:text-white">
                Shopping Cart
              </Link>
            </li>

            <li>
              <Link href="/orders" className="hover:text-white">
                Track Order
              </Link>
            </li>

            <li>
              <Link href="/profile" className="hover:text-white">
                My Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>

            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/returns" className="hover:text-white">
                Return Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">
            Contact Us
          </h4>

          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </li>

            <li className="flex items-center gap-2">
              <Mail size={14} className="shrink-0" />
              <span>support@dailybuy.app</span>
            </li>

            <li className="flex items-center gap-2">
              <Phone size={14} className="shrink-0" />
              <span>+880 1XXX-XXXXXX</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} DailyBuy. All rights reserved.
          </span>

          <div className="flex items-center gap-2">
            <span>We accept:</span>

            <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
              bKash
            </span>

            <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
              Nagad
            </span>

            <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}