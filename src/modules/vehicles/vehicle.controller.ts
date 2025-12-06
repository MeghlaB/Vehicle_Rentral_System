
import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";

// ---------------- create Vehicles crud ---------------
const createVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.createVehicles(req.body)
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//  -----------  Get Vehicles CRUD ---------------
const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getVehicles()
          if (result.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
           

        })
    }
}

// ---------- GET Single Vehicles CRUD---------------

const getSingleVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getSingleVehicles(req.params.vehicleId!)
        if (result.length === 0) {
            res.status(400).json({
                success: false,
                message: "Vehicles not found",

            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,

        })
    }
}

//  ------------- get Vehicles Updated----------------

const getVehiclesUpdated = async (req: Request, res: Response) => {
  const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;


  try {
    const result = await vehicleServices.getVehiclesUpdated(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      req.params.vehicleId as string
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//  -------------- Delete Vehicles ----------------
const vehicleDeleted = async (req: Request, res: Response) => {
    try {
        const {vehicleId } = req.params; 

        const result = await vehicleServices.vehicleDeleted(vehicleId!)
        console.log(result)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",

            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
                data: result.rows
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,

        })
    }
}












export const vehiclesControl = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    getVehiclesUpdated,
    vehicleDeleted
}