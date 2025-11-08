import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode";
import { userInterface } from './types/userTypes';

const authRoutes = ['/login', '/register', 'forget-password'];
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    const {pathname} = request.nextUrl;

    if(!accessToken && !refreshToken && !authRoutes.includes(pathname)){
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url))
    }

     let user: userInterface | null = null;

    if(accessToken){
        try {
            user = jwtDecode(accessToken)
            
        } catch (error : any) {
            console.log("error decoding access token", error);
             return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url))
        }
    }



  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password'],
}