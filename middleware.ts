import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname == '/') {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = '/random/en';
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
}
