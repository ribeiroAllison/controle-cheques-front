import { NextResponse } from "next/server";

export default function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const isUserAllowed = request.cookies.get("userAllowed")?.value;
  
  if (!token) {
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl, {
      "Set-Cookie": `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
    });
  }

  if (!isUserAllowed) {
    const redirectUrl = new URL("/teste-finalizado", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  const cookieMaxAge = 60 * 60 * 24;

  return NextResponse.next({
    cookies: [
      {
        name: "token",
        value: token,
        path: "/",
        maxAge: { cookieMaxAge },
        httpOnly: true,
      },
    ],
  });
}

export const config = {
  matcher: ["/cadastro/:path*", "/cheques/:path*", "/configuracoes/:path*", "/dashboard/:path*"],
};
