import pool from '@/lib/db.js';
import { put } from '@vercel/blob';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const nomedopet = formData.get("nomedopet");
        const idadedopet = formData.get("idadedopet");
        const raca = formData.get("raca");
        const sexo = formData.get("sexo");
        const imagemPet = formData.get("imagem");
        const enderecocidade = formData.get("enderecocidade")

        if (!nomedopet || !idadedopet || !raca || !sexo || !enderecocidade) {
            return Response.json({ error: 'Todos os campos são obrigatorios' },
                { status: 400 }
            );
        }

        const query = `
    INSERT INTO pet (nomedopet, idadedopet, raca_id, sexo, enderecocidade)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `

        const values = [nomedopet, idadedopet, raca, sexo, enderecocidade];
        const result = await pool.query(query, values);
        const petCadastrado = result.rows[0];

        const blob = await put(`pets/${imagemPet}`, imagemPet, {
            access: 'public',
            addRandomSuffix: true,
        });

        return Response.json(petCadastrado, { status: 201 });

    } catch (error) {
        console.error('Erro na API cadastrarPet:', error);
        return Response.json({ error: 'Error no servidor' },
            { status: 500 });
    }
}