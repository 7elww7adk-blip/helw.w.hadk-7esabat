import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login"];

export function middleware(request: NextRequest) {
  if (publicPaths.includes(request.nextUrl.pathname)) return NextResponse.next();
  const role = request.cookies.get("role")?.value;
  if (!role) return NextResponse.redirect(new URL("/login", request.url));

  if (request.nextUrl.pathname.startsWith("/delivery-mobile") && role !== "DELIVERY_AGENT") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
