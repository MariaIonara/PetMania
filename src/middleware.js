import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const rotasProtegidas = [
    "/registrarPet",
    "/telaPrincipal",
    "/telaServico",
  ];

  const precisaAuth = rotasProtegidas.some((rota) =>
    pathname.startsWith(rota)
  );

  if (precisaAuth && !token) {
    return NextResponse.redirect(new URL("/loginUsuario", req.url));
  }

  if (pathname.startsWith("/loginUsuario") && token) {
    return NextResponse.redirect(new URL("/telaPrincipal", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/registrarPet/:path*",
    "/telaPrincipal/:path*",
    "/telaServico/:path*",
    "/loginUsuario",
  ],
};
