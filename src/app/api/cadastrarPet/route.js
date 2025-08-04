import db from "@/lib/db"

export async function POST(request) {
    const formData = await request.formData();
    const nomeDoPet = formData.get("nomedopet");
    const idadedoPet = formData.get("idadedopet");
    const raca = formData.get("raca");
    const sexo = formData.get("sexo");

    const query = `
    INSERT INTO pet (nomedopet, idadedopet, raca, sexo)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `

    const values = [nomeDoPet, idadedoPet, raca, sexo];
    const result = await db.query(query, values);
    const petCadastrado = result.rows[0];

    return new Response (JSON.stringify(petCadastrado), {
        status: 201,
        headers: { 'Content-Type': 'application/json'},
    });
}