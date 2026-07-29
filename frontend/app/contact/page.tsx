import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="px-4 md:px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>
      <div className="space-y-4 text-gray-700">
        <div className="flex items-center gap-3">
          <Mail size={18} /> support@dailybuy.app
        </div>
        <div className="flex items-center gap-3">
          <Phone size={18} /> +880 1XXX-XXXXXX
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={18} /> Dhaka, Bangladesh
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-8">
        Have a question about an order? Log in and check your order status on the{" "}
        <a href="/profile" className="underline">profile page</a> first — most questions can be answered there.
      </p>
    </div>
  );
}