import { NextResponse } from 'next/server'
import { baseURL } from './url'

const signInURL = `${baseURL}/home/cadastro/`

export function middleware(res) {
    const token = res.headers.get('x-auth-token')

    if (!token) {
        return NextResponse.redirect(signInURL)
    }

    return NextResponse.next()
}

//export const config = {
//    matcher: '/home/:path*',
//}


/* In progress */