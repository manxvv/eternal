// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get('is-admin')?.value;
  const { pathname } = request.nextUrl;

  // Debugging: This will show in your VS Code terminal
  console.log(`Middleware checking path: ${pathname} | isAdmin: ${isAdmin}`);

  // If the user is trying to enter the admin area
  if (pathname.startsWith('/admin')) {
    // If the cookie is NOT exactly "true", send them to login
    if (isAdmin !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Ensure the middleware runs on ALL admin paths
export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
  ],
};