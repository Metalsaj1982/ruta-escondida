import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Protect /admin and /emprendedor routes
  if (path.startsWith('/admin') || path.startsWith('/emprendedor')) {
    // In a real Supabase setup, you would verify the session token from cookies
    // For now, if we are in mock mode, we just let it pass or redirect to login if no auth mock is set
    
    // We will let the client-side components handle the actual Supabase session redirection
    // to avoid complex SSR auth setup in this phase.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/emprendedor/:path*'],
};
