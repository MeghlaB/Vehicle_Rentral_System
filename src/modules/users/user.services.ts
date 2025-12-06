import bcrypt from "bcryptjs";
import { pool } from "../../config/db/db";
const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, role, phone } = payload

    const hashedPass = await bcrypt.hash(password as string, 10)

    const result = await pool.query(`INSERT INTO users (name, email, role, password, phone) VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, role, hashedPass, phone])
    console.log(result.rows);
    delete result.rows[0].password
    delete result.rows[0].created_at
    delete result.rows[0].updated_at

    return result;
}

export const userServices = {
    createUser
}