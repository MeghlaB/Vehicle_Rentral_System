import { Request, Response } from "express";
import { bookingServices } from "./booking.services";
import { JwtPayload } from "jsonwebtoken";


//  -------------------- create booking ----------------------

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    if (typeof result === "string") {
      return res.status(400).json({
        success: false,
        message: result
      });
    }
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

//  ------------ get bookings------------


const getAllBookings = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const user = req.user;
    const result = await bookingServices.getAllBookings(user);

    if (result === "UNAUTHORIZED") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this resource",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {
    console.error("getAllBookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



//  ------------------------ updated Booking system ------------------------------

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const user = req.user;
 
    const result = await bookingServices.updateBooking(bookingId as string, status, user);

    res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      data: result.data || null
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



export const bookingController = {
  createBooking,
  updateBooking,
  getAllBookings
};
