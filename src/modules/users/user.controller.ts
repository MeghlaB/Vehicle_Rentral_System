import { Request, Response } from "express";
import { userServices } from "./user.services";

// ------------------- Create users crud --------------
const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.createUser(req.body);


        if (!result.success) {
            return res.status(400).json(result);
        }


        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.data
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//  ----------------Get users crud ---------------
const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUsers()
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,

        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,

        })
    }
}

//  ---------------- get single users -------------
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getSingleUser(req.params.userId!)
        if (result.rows.length === 0) {
            res.status(400).json({
                success: false,
                message: "users not found",

            })
        } else {
            res.status(200).json({
                success: true,
                message: "users fetched",
                data: result.rows[0]
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,

        })
    }
}


//  ------------- get usersUpdated----------------

const getUserUpdated = async (req: Request, res: Response) => {
    const { name, email, role, phone } = req.body
    try {
        const result = await userServices.getUserUpdated(name, email, role, phone, req.params.userId as string)
        if (result.rows.length === 0) {
            res.status(400).json({
                success: false,
                message: "users not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//  --------------- users deleted -----------

const userDeleted = async (req: Request, res: Response) => {
    try {
        const {userId } = req.params; 

        const result = await userServices.userDeleted(userId!)
       
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "users not found",

            })
        } else {
            res.status(200).json({
                success: true,
                message: "users Successfully Deleted",
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






export const usersControllers = {
    createUser,
    getUsers,
    getUserUpdated,
    userDeleted,
    getSingleUser

}