
import express from "express"
import { vehiclesControl } from "./vehicle.controller"
import auth from "../../middleware/auth/auth"
const router = express.Router()
router.post("/vehicles",auth("admin"),vehiclesControl.createVehicles)
router.get("/vehicles",vehiclesControl.getVehicles)
router.get("/vehicles/:vehicleId",vehiclesControl.getSingleVehicles)
router.put("/vehicles/:vehicleId",auth("admin"),vehiclesControl.getVehiclesUpdated)
router.delete("/vehicles/:vehicleId",auth("admin"),vehiclesControl.vehicleDeleted)

export const vehicleRoutes = router