
import express from "express"
import authorize from "../../middleware/auth/auth"
import { bookingController } from "./booking.controller"
const router = express.Router()
router.post("/bookings",authorize("admin","customer"),bookingController.createBooking)
router.get( "/bookings",authorize("admin", "customer"),bookingController.getAllBookings);
router.put("/bookings/:bookingId",authorize("admin", "customer"),bookingController.updateBooking);
export const bookingRoutes = router