import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware runs before every request
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;

  // Log the request (for demonstration)
  console.log(`[Middleware] Request to: ${pathname}`);

  // Example: Add custom headers
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  response.headers.set('x-request-time', new Date().toISOString());

  // Example: Redirect logic (commented out for demo)
  // if (pathname === '/old-page') {
  //   return NextResponse.redirect(new URL('/new-page', request.url));
  // }

  // Example: Rewrite logic (commented out for demo)
  // if (pathname === '/api/v1/users') {
  //   return NextResponse.rewrite(new URL('/api/users', request.url));
  // }

  // Example: Block certain paths (commented out for demo)
  // if (pathname.startsWith('/admin')) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all paths except static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
