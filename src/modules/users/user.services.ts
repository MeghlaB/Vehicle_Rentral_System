import bcrypt from "bcryptjs";
import { pool } from "../../config/db/db";
// --------------- create users crud ---------------------
const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, role, phone } = payload;

    const pass = password as string;

    if (!pass || pass.length < 6) {
        return {
            success: false,
            message: "Password length must be at least 6 characters",
        };
    }

    const hashedPass = await bcrypt.hash(pass, 10);

    const result = await pool.query(
        `INSERT INTO users (name, email, role, password, phone)
         VALUES($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, email, role, hashedPass, phone]
    );
    delete result.rows[0].password;

    return {
        success: true,
        data: result.rows[0],
    };
};

//  ------------------- get users crud --------------------
const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    delete result.rows[0].password
    return result

}
// ----------------- single users ------------------
const getSingleUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    delete result.rows[0].password
    return result;
}


//  ------------- updated users ---------------
const getUserUpdated = async (name: string, email: string, role: string, phone: string, id: string) => {
    const result = await pool.query(`UPDATE users SET name=$1,email=$2,role=$3,phone=$4 WHERE id=$5 RETURNING*`, [name, email, role, phone, id])
    delete result.rows[0].password
    return result

}

//  --------------- deleted user --------------------

const userDeleted = async (userId :string) => {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [userId])
    delete result.rows[0].password
    return result;
}


export const userServices = {
    createUser,
    getUsers,
    getUserUpdated,
    userDeleted,
    getSingleUser

}