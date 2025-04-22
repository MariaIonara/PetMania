import db from './db';

export asnyc function getUsuarios() {
        const result = await db.query('SELECT * FROM')
        return result.rows;
}
  