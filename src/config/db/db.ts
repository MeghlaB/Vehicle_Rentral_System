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
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer')),
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        Phone VARCHAR(15)
         
        )`
    )

    await pool.query(
        `CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY, 
            vehicle_name VARCHAR(100) NOT NULL, 
            type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
            registration_number VARCHAR(150) UNIQUE NOT NULL,
            daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0), 
            availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked'))
        );`
    )
}

export default initBD;