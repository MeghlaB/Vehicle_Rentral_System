import express from "express";
import { usersControllers } from "./user.controller";
import auth from "../../middleware/auth/auth";


const router = express.Router()
router.post("/signup",usersControllers.createUser)
router.get("/users",auth("admin"),usersControllers.getUsers)
router.get("/users/:userId",usersControllers.getSingleUser)
router.put("/users/:userId",usersControllers.getUserUpdated)
router.delete("/users/:userId",usersControllers.userDeleted)

export  const usersRoutes= router