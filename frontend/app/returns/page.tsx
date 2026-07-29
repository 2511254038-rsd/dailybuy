export default function ReturnsPage() {
  return (
    <div className="px-4 md:px-6 py-12 max-w-3xl mx-auto prose">
      <h1 className="text-2xl font-semibold mb-4">Return Policy</h1>
      <p className="text-gray-700 leading-relaxed">
        If an item arrives damaged, defective, or not as described, contact us within 3 days of
        delivery for a replacement or refund.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        Items must be unused and in their original packaging to be eligible for return. Refunds
        for prepaid orders (bKash/Nagad) are processed within 5–7 business days after the returned
        item is received and inspected. Cash-on-delivery refunds are issued via bKash/Nagad
        transfer.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        To start a return, reach out via the <a href="/contact" className="underline">contact page</a>{" "}
        with your order number.
      </p>
    </div>
  );
}