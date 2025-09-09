import pool from '@/lib/db.js';

export async function GET(request) {
    try {
        const query = `SELECT id, nome FROM raca`
        const result = await pool.query(query);
        const racas = result.rows;

        return Response.json(racas, { status: 200 });

    } catch (error) {
        console.error('Erro nas raças :', error);
        return Response.json({ error: 'Error no servidor' },
            { status: 500 });
    }
}

    