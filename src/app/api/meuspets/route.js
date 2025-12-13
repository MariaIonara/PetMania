import { getServerSession } from 'next-auth';
import pool from '@/lib/db';
import { authOptions } from '../auth/[...nextauth]/route'; 

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
            return new Response(
                JSON.stringify({ error: 'Usuário não autenticado' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const idusuario = session.user.id; 
        const result = await pool.query('SELECT * FROM pet WHERE idusuario = $1', [idusuario]);
        const petCadastrado = result.rows;

        return new Response(JSON.stringify(petCadastrado), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Erro ao buscar pets:', error);
        return new Response(
            JSON.stringify({ error: 'Erro interno ao buscar dados' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}