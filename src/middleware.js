import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value // pega o token na request

    if (!token) {
        return NextResponse.redirect('localhost:3000/', {
            'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
        })
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/cadastro/:path*', '/cheques/:path*', '/home/dashboard'],
}