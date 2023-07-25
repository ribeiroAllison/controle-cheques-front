import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value
    console.log('Token do Middlware = ', token);

    if (!token) {
        const redirectUrl = new URL('/home/login', request.nextUrl.origin);
        return NextResponse.redirect(redirectUrl, {
            'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
        })
    }
    const cookieMaxAge = 60 * 60 * 24;
    
    return NextResponse.next({
        cookies: [
            {
                name: 'token',
                value: token,
                path: '/',
                maxAge: { cookieMaxAge },
                httpOnly: true,
            },
        ],
    });
}

export const config = {
    matcher: ['/cadastro/:path*', '/cheques/:path*', '/home/dashboard', '/home/perfil'],
}