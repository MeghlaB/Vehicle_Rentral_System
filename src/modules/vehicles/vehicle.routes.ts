
import express from "express"
import { vehiclesControl } from "./vehicle.controller"
import authorize from "../../middleware/auth/auth"

const router = express.Router()
router.post("/vehicles",authorize("admin"),vehiclesControl.createVehicles)
router.get("/vehicles",vehiclesControl.getVehicles)
router.get("/vehicles/:vehicleId",vehiclesControl.getSingleVehicles)
router.put("/vehicles/:vehicleId",authorize("admin"),vehiclesControl.getVehiclesUpdated)
router.delete("/vehicles/:vehicleId",authorize("admin"),vehiclesControl.vehicleDeleted)

export const vehicleRoutes = router