import pool from '@/lib/db.js';

// Receber agendamentos
export async function POST(request) {
    try {
        const formData = await request.formData();
        const data_agendamento = formData.get("data_agendamento");

        if (!data_agendamento) {
            return Response.json({ error: 'Todos os campos são obrigatorios' },
                { status: 400 }
            );
        }

        const query = `
            SELECT * FROM agendamento WHERE data_agendamento = $1;
        `

        const values = [data_agendamento];
        const result = await pool.query(query, values);
        const agendamentos = result.rows;

        return Response.json(agendamentos);

    } catch (error) {
        console.error('Erro ao receber agendamentos :', error);
        return Response.json({ error: 'Error no servidor' },
            { status: 500 });
    }
}    