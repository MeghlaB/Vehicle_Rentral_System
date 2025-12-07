import config from "../../config";
import { pool } from "../../config/db/db";
import jwt, { JwtPayload } from "jsonwebtoken"

interface User {
  id: number;
  role: string;
  name?: string;
  email?: string;
  phone?: string;
}



// --------- create booking crud ------------
type BookingResult =
  | { success: true; booking: any; vehicle: { vehicle_name: string; daily_rent_price: number; } }
  | "Car not found"
  | "The car is currently booked."
  | "The date is incorrect";

const createBooking = async (payload: Record<string, unknown>): Promise<BookingResult> => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;


  const vehicleQuery = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id]);

  if (!vehicleQuery || !vehicleQuery.rows || vehicleQuery.rows.length === 0) {
    return "Car not found";
  }
  const vehicle = vehicleQuery.rows[0];

  if (vehicle.availability_status !== "available") {
    return "The car is currently booked.";
  }
  //  Calculate total price
  const dailyRate = Number(vehicle.daily_rent_price);
  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);

  const diffTime = endDate.getTime() - startDate.getTime();
  const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (duration <= 0) {
    return "The date is incorrect";
  }

  const total_price = dailyRate * duration;

  // ----------------  Insert booking ---------------------------
  const bookingQuery = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1, $2, $3, $4, $5, 'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  const booking = bookingQuery.rows[0];

  // ------------------------------- Update vehicle status ------------------------
  await pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1`, [vehicle_id]);


  return {
    success: true,
    booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: dailyRate
    }
  };
};


const getAllBookings = async (user: JwtPayload) => {

  // ---------- ADMIN ----------
  if (user.role === "admin") {

    const bookings = await pool.query(`SELECT * FROM bookings ORDER BY id DESC`);

    const results = [];
    for (let b of bookings.rows) {
      const customer = await pool.query(
        `SELECT name, email FROM users WHERE id = $1`,
        [b.customer_id]
      );

      const vehicle = await pool.query(
        `SELECT vehicle_name, registration_number FROM vehicles WHERE id = $1`,
        [b.vehicle_id]
      );

      results.push({
        ...b,
        customer: customer.rows[0],
        vehicle: vehicle.rows[0],
      });
    }

    return {
      success: true,
      message: "Bookings retrieved successfully",
      role: "admin",
      data: results,
    };
  }

  // ---------- CUSTOMER ----------
  if (user.role === "customer") {

    const bookings = await pool.query(
      `SELECT * FROM bookings WHERE customer_id = $1 ORDER BY id DESC`,
      [user.id]
    );

    const results = [];
    for (let b of bookings.rows) {
      const vehicle = await pool.query(
        `SELECT vehicle_name, registration_number, type FROM vehicles WHERE id = $1`,
        [b.vehicle_id]
      );

      results.push({
        id: b.id,
        vehicle_id: b.vehicle_id,
        rent_start_date: b.rent_start_date,
        rent_end_date: b.rent_end_date,
        total_price: b.total_price,
        status: b.status,
        vehicle: vehicle.rows[0],
      });
    }

    return {
      success: true,
      message: "Your bookings retrieved successfully",
      role: "customer",
      data: results,
    };
  }

  return "UNAUTHORIZED";
};





//   ------------------ Updated admin and customer -----------------------------

const updateBooking = async (bookingId: string, status: string, user: any) => {

  if (!["cancelled", "returned"].includes(status)) {
    return {
      statusCode: 400,
      success: false,
      message: "Invalid status. Use 'cancelled' or 'returned'."
    };
  }

 
  const bookingResult = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
  if (!bookingResult.rows.length) {
    return {
      statusCode: 404,
      success: false,
      message: "Booking not found"
    };
  }

  const booking = bookingResult.rows[0];

  // ---------------- CUSTOMER -------------------
  if (user.role === "customer") {
    if (status !== "cancelled") {
      return {
        statusCode: 403,
        success: false,
        message: "Customers can only cancel bookings"
      };
    }

   
    if (booking.status.toLowerCase() === "cancelled") {
      return {
        statusCode: 200,
        success: true,
        message: "Booking already cancelled",
        data: booking
      };
    }

    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    const startDate = new Date(booking.rent_start_date);
    const startDateUTC = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));

    if (todayUTC >= startDateUTC) {
      return {
        statusCode: 400,
        success: false,
        message: "Booking cannot be cancelled after start date"
      };
    }

    const updatedBooking = await pool.query(
      `UPDATE bookings SET status='cancelled' WHERE id=$1 RETURNING *`,
      [bookingId]
    );

    return {
      statusCode: 200,
      success: true,
      message: "Booking cancelled successfully",
      data: updatedBooking.rows[0]
    };
  }

  // ---------------- ADMIN  -------------------
  if (user.role === "admin") {
    if (status !== "returned") {
      return {
        statusCode: 403,
        success: false,
        message: "Admin can only mark booking as returned"
      };
    }


    if (booking.status.toLowerCase() === "returned") {
      return {
        statusCode: 200,
        success: true,
        message: "Booking already marked as returned",
        data: booking
      };
    }

    const updatedBooking = await pool.query(
      `UPDATE bookings SET status='returned' WHERE id=$1 RETURNING *`,
      [bookingId]
    );

   
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );

    return {
      statusCode: 200,
      success: true,
      message: "Booking marked as returned. Vehicle is now available",
      data: {
        ...updatedBooking.rows[0],
        vehicle: { availability_status: "available" }
      }
    };
  }

  return {
    statusCode: 403,
    success: false,
    message: "Access denied"
  };
};



export const bookingServices = {
  createBooking,

  updateBooking,
  getAllBookings
};
