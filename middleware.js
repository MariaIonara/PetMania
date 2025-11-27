import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;
    console.log("Cheguei aq")
    const precisaAuth =
        pathname.startsWith("/registrar") ||
        pathname.startsWith("/telaPrincipal") ||
        pathname.startsWith("/telaServico");

    if (precisaAuth && !token) {
        const url = new URL("/loginUsuario", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    /*
    if (pathname.startsWith("/admin")) {
        if (!token) return NextResponse.redirect(new URL("/novoLogin", req.url));
        if (token.role !== "admin")
            return NextResponse.redirect(new URL("/nao-autorizado", req.url));
    }
    */
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/registrar/:path*",
        "/telaPrincipal/:path*",
        "/telaServico/:path*",
    ],
};