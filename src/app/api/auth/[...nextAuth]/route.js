import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import pool from "@/lib/db";

async function getUserByEmail(email) {
    const client = await pool.connect();
    const res = await client.query(
        "SELECT id, nome, email, senha, tipo, telefone FROM cliente WHERE email = $1",
        [email]
    );
    client.release();
    return res.rows[0] || null;
}

export const authOptions = {
    session: { strategy: "jwt" },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        CredentialsProvider({
            name: "Credenciais",
            credentials: {
                email: { label: "Email", type: "text" },
                senha: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
                const { email, senha } = credentials;

                const user = await getUserByEmail(email);

                if (!user) return null;

                const ok = await compare(senha, user.senha);
                if (!ok) return null;

                return { 
                    id: user.id, 
                    name: user.nome, 
                    email: user.email,
                    role: user.tipo 
                };
            }
        })
    ],

    callbacks: {
    async jwt({ token, user, account, profile }) {

        // Quando o usuário faz login (Google ou Credenciais)
        if (user) {

            // Se login via Google
            if (account?.provider === "google" && profile?.email) {
                let existing = await getUserByEmail(profile.email);

                // Se já existe no banco, usa
                if (existing) {
                    token.id = existing.id;
                    token.name = existing.nome;
                    token.email = existing.email;
                    token.role = existing.tipo;
                } 
                // Se não existe, cria
                else {
                    const client = await pool.connect();
                    const res = await client.query(
                        "INSERT INTO cliente (nome, email, tipo) VALUES ($1, $2, $3) RETURNING id, tipo",
                        [profile.name ?? "Usuário", profile.email, "cliente"]
                    );
                    client.release();

                    token.id = res.rows[0].id;
                    token.name = profile.name;
                    token.email = profile.email;
                    token.role = res.rows[0].tipo;
                }
            }

            // Se login via credenciais
            else {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
        }

        return token;
    },

    async session({ session, token }) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        return session;
    }
    },

    pages: {
        signIn: "/loginUsuario"
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions };
