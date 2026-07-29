export default function AboutPage() {
  return (
    <div className="px-4 md:px-6 py-12 max-w-3xl mx-auto prose">
      <h1 className="text-2xl font-semibold mb-4">About DailyBuy</h1>
      <p className="text-gray-700 leading-relaxed">
        DailyBuy is an online marketplace built to make everyday shopping simple, fast, and reliable.
        From electronics to everyday essentials, we connect customers with quality products and a
        smooth end-to-end experience — from browsing to checkout to delivery.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        This project was built as a full-stack e-commerce application, covering customer accounts,
        product browsing, cart and checkout, order tracking, and an admin dashboard for managing
        products, orders, and promotions.
      </p>
    </div>
  );
}