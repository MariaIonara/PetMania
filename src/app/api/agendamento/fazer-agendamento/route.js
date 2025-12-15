import pool from '@/lib/db.js';

// Fazer agendamentos
export async function POST(request) {
    try {
        const formData = await request.formData();

        const hora = formData.get("hora");
        const data_agendamento = formData.get("data_agendamento");
        const ordem = formData.get("ordem");
        const id_cliente = formData.get("id_cliente");
        const id_pet = formData.get("id_pet");

        if (!hora || !data_agendamento || !ordem || !id_cliente || !id_pet) {
            return Response.json(
                { error: 'Todos os campos são obrigatórios' },
                { status: 400 }
            );
        }

        const query = `
            INSERT INTO agendamento 
                (hora, data_agendamento, ordem, id_cliente, id_pet) 
            VALUES 
                ($1, $2, $3, $4, $5)
            RETURNING id;
        `;

        const values = [
            hora,
            data_agendamento,
            ordem,
            id_cliente,
            id_pet
        ];

        const result = await pool.query(query, values);

        const agendamentoId = result.rows[0].id;

        return Response.json(
            { id: agendamentoId },
            { status: 201 }
        );

    } catch (error) {
        console.error('Erro ao fazer agendamento:', error);
        return Response.json(
            { error: 'Erro no servidor' },
            { status: 500 }
        );
    }
}
