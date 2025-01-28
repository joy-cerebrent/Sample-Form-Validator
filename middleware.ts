// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('accessToken')?.value;
  
//   console.log("Middleware : ", request.nextUrl.pathname)
  
//   if (
//     !token &&
//     request.nextUrl.pathname !== '/login' &&
//     request.nextUrl.pathname !== '/signup'
//   ) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (
//     token &&
//     (
//       request.nextUrl.pathname === '/login' ||
//       request.nextUrl.pathname === '/signup'
//     )
//   ) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }
