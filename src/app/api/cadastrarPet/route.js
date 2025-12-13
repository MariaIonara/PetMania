import pool from '@/lib/db.js';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const nomedopet = formData.get("nomedopet");
        const idadedopet = formData.get("idadedopet");
        const raca = formData.get("raca");
        const sexo = formData.get("sexo");
        const enderecocidade = formData.get("enderecocidade")
        const idusuario = formData.get("idusuario")

        if (!nomedopet || !idadedopet || !raca || !sexo || !enderecocidade || !idusuario) {
            return Response.json({ error: 'Todos os campos são obrigatorios' },
                { status: 400 }
            );
        }

        const query = `
    INSERT INTO pet (nomedopet, idadedopet, raca_id, sexo, enderecocidade, idusuario)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `

        const values = [nomedopet, idadedopet, raca, sexo, enderecocidade, idusuario];
        const result = await pool.query(query, values);
        const petCadastrado = result.rows[0];

        return Response.json(petCadastrado, { status: 201 });

    } catch (error) {
        console.error('Erro na API cadastrarPet:', error);
        return Response.json({ error: 'Error no servidor' },
            { status: 500 });
    }
}

export async function GET() {
    try{
       const result = await pool.query("SELECT * FROM pet ORDER BY id DESC");
       const petCadastrado = result.rows; 

       return new Response(JSON.stringify(petCadastrado), {
        status:200,
        headers: {'Content-Type': 'application/json'},
       });

    }catch (error) {
        console.error('Erro ao buscar cadastrarPet:', error);
        return new Response.json({ error: 'Error interno ao buscar dados' },
            { status: 500 }
        );
    }
    
}