import Cookies from 'js-cookie';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/auth/*';

  const token = Cookies.get('token');
  /*  const res = NextResponse.next(); */

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
  }
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

export const config = {
  matcher: ['/auth'],
};
