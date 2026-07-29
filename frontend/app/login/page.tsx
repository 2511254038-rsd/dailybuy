import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/common/Logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6"><Logo size="lg" /></div>
        <div className="border rounded-xl p-6 shadow-sm">
          <h1 className="text-lg font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-5">Sign in to continue shopping</p>
          <LoginForm />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <Link href="/register" className="text-gray-900 font-medium underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}