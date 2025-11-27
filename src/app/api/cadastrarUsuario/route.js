import bcrypt from "bcryptjs"; 
import pool from '@/lib/db.js';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const nome = formData.get("nome");
        const email = formData.get("email");
        const senha = await bcrypt.hash(formData.get("senha"), 12);
        const tipo = formData.get("tipo");
        const telefone = formData.get("telefone");
        //const role = "cliente";

        if (!nome || !email || !senha || !tipo || !telefone) {
            return Response.json({ error: 'Todos os campos são obrigatorios' },
                { status: 400 }
            );
        }

        const query = `
    INSERT INTO cliente (nome, email, senha, tipo, telefone)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `

        const values = [nome, email, senha, tipo, telefone];
        const result = await pool.query(query, values);
        const usuarioCadastrado = result.rows[0];

        return Response.json(usuarioCadastrado, { status: 201 });

    } catch (error) {
        console.error('Erro na API cadastrarUsuario :', error);
        return Response.json({ error: 'Error no servidor' },
            { status: 500 });
    }
}

    