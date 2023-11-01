import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/auth/*';

  const token = request.cookies.get('token')?.value || '';
  /*  const res = NextResponse.next(); */
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
  }
}

export const config = {
  matcher: ['/'],
};
