import { NextResponse } from 'next/server';
import { baseURL } from './utils/url';

export function middleware(request) {
    const token = request.cookies.get('token')?.value // pega o token na request

    if (!token) {
        return NextResponse.redirect(baseURL, {
            'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
        })
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/cadastro/:path*', '/cheques/:path*', '/home/dashboard'],
}