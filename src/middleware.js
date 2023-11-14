import { NextResponse } from "next/server";
import { getCookie } from "./utils/cookie";

export default function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const expired = getCookie("userAllowed")

  if (!token) {
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl, {
      "Set-Cookie": `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
    });
  }

  if (expired) {
    const redirectUrl = new URL("/perfil", request.nextUrl.origin);
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
  matcher: ["/cadastro/:path*", "/cheques/:path*"],
};
