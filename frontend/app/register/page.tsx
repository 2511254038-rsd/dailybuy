import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/common/Logo";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <div className="border rounded-xl p-6 shadow-sm">
          <h1 className="text-lg font-semibold mb-1">Create your account</h1>
          <p className="text-sm text-gray-500 mb-5">Join DailyBuy and start shopping today</p>
          <RegisterForm />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link href="/login" className="text-gray-900 font-medium underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}