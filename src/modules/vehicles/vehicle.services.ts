import { pool } from "../../config/db/db"


//  ------------------- CreateVehicles- -----------
const createVehicles = async (payload:Record<string,unknown>)=>{
  const {vehicle_name,type,registration_number,daily_rent_price, availability_status} = payload

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price, availability_status) VALUES($1,$2,$3,$4,$5) RETURNING*`,[vehicle_name,type,registration_number,daily_rent_price,availability_status]
  )
  return result

}

//  ------------------- Get All Vehicle ----------
const getVehicles = async()=>{
    const result = await pool.query(`SELECT * FROM vehicles`)
    console.log(getVehicles)
    return result.rows
}

//  ---------- single Vehicles ------------------

const getSingleVehicles = async (vehicleId: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId])
    return result.rows;
}

//  ------------- updated Vehicles ---------------

const getVehiclesUpdated = async (
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: string,
  availability_status: string, // <-- problem likely originates here
  vehicleId: string
) => {
   const result = await pool.query(
      `UPDATE vehicles 
       SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 
       WHERE id=$6 
       RETURNING *`,
      [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]
    );

    return result
}

//  --------------- Delete Vehicles -----------


const vehicleDeleted = async (vehicleId: string | undefined) => {
    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING *`, [vehicleId])
    // delete result.rows[0]
    return result
}





 export const vehicleServices ={
    createVehicles,
    getVehicles,
    getSingleVehicles,
    getVehiclesUpdated,
    vehicleDeleted
}