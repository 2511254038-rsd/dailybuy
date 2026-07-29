import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedPaths = ["/profile", "/cart", "/checkout", "/orders"];
const adminPaths = ["/admin"];

async function getRole(token: string): Promise<string | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return (payload.role as string) || null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAdminPath = adminPaths.some((p) => pathname.startsWith(p));
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (!isAdminPath && !isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminPath) {
    const role = await getRole(token);
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/cart/:path*", "/checkout/:path*", "/orders/:path*", "/admin/:path*"],
};