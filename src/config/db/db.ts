import { Pool } from "pg"
import config from ".."
// Database Query 

export const pool = new Pool({
    connectionString: `${config.connection_str}`
})

const initBD = async () => {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        Phone VARCHAR(15),
         created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`
    )
}

export default initBD;