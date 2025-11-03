import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

    const token = request.cookies.get('accessToken')?.value;

    const {pathname} = request.nextUrl;

    const protectedPath = ['/dashboard/*', '/profile', '/settings', 'appointment'];

    const authRoutes = ['/login', '/register', 'forget-password'];

    const isProtectedPath = protectedPath.some((path) =>{
        pathname.startsWith(path)
    })

    const isAuthRoutes = authRoutes.some((route) =>
        pathname === route
    )

    if(isProtectedPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(isAuthRoutes && token){
        return NextResponse.redirect(new URL('/', request.url))
    }


  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password'],
}