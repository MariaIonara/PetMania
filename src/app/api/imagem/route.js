import pool from '@/lib/db.js';
import { put } from '@vercel/blob';

export async function POST(request) {
    try {
        const imagemPet = request.body;
        
        const blob = await put(`pets/${imagemPet}`, imagemPet, {
            access: 'public',
            addRandomSuffix: true
        });

        return Response.json(blob, { status: 201 });

    } catch (error) {
        console.error('Erro na API cadastrarPet:', error);
        return Response.json({ error: 'Error no servidor' },
            { status: 500 });
    }
}