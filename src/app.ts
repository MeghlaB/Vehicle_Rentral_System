import express, { NextFunction, Request, Response } from "express"
import initBD from "./config/db/db"
import { usersRoutes } from "./modules/users/user.routes"
import { authRoutes } from "./modules/auth/auth.routes"
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes"
import { bookingRoutes } from "./modules/bookings/booking.routes"

const app = express()

// ------------ Parser ----------
app.use(express.json())

// ------------ Initialization DB -------------
initBD()

app.get('/', (req:Request, res:Response) => {
  res.send('VEHICLE_RENTAL_SYSTEM.........!')
})
// !------------ Users CRUD -----------
app.use("/api/v1/auth",usersRoutes) 
app.use("/api/v1",usersRoutes)
// !-------------- AUTH ----------
app.use("/api/v1/auth",authRoutes)

// ! ----------- Vehicles CRUD----------
 app.use("/api/v1",vehicleRoutes)
// !---------------- Booking CRUD -------
app.use("/api/v1",bookingRoutes)

app.use((req , res)=>{
    res.status(404).json({
        success:false,
        message:"NOT FOUND ROUTE",
        path:req.path
    })
})

export default app