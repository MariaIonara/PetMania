import db from './db';

export async function getUsuarios() {
        const result = await db.query('SELECT * FROM')
        return result.rows;
}
  