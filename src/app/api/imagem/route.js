import pool from '@/lib/db.js';
import { put } from '@vercel/blob';

export async function POST(request) {
    try {
        // Extraindo o corpo da requisição
        const imagemPet = request.body;

        // Fazendo o upload da imagem usando a função put
        const blob = await put(`pets/${imagemPet}`, imagemPet, {
            access: 'public',
            addRandomSuffix: true
        });

        // Supondo que 'blob' tenha uma propriedade 'url' com o link da imagem
        const imagemUrl = blob.url;  // O URL da imagem após o upload

        return new Response(
            JSON.stringify({ url: imagemUrl }),  // Retorna o URL da imagem
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Erro na API cadastrarPet:', error);
        return new Response(
            JSON.stringify({ error: 'Erro no servidor' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
