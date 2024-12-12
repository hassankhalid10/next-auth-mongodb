// /app/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Middleware running"); // Check if middleware is invoked
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    console.log("No token found"); // Log if token is missing
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log("Token retrieved:", token); // Log token if available
  return NextResponse.next();
}

export const config = {
  matcher: ["/about", "/contact"],   // Specify protected routes
};
