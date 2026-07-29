export default function PrivacyPage() {
  return (
    <div className="px-4 md:px-6 py-12 max-w-3xl mx-auto prose">
      <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 leading-relaxed">
        We collect only the information needed to process your orders: your name, email, phone
        number, and shipping address. Your password is stored securely (hashed, never in plain
        text) and is never visible to us or shared with anyone.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        We do not sell or share your personal information with third parties, except as required
        to process payments or deliver your orders (e.g. sharing your address with a delivery
        partner).
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        You can view and update your information at any time from your{" "}
        <a href="/profile" className="underline">profile page</a>.
      </p>
    </div>
  );
}