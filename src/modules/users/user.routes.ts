import express from "express";
import { usersControllers } from "./user.controller";
import authorize from "../../middleware/auth/auth";


const router = express.Router()
router.post("/signup",usersControllers.createUser)
router.get("/users",authorize("admin"),usersControllers.getUsers)
router.get("/users/:userId",authorize("admin","customer"),usersControllers.getSingleUser)
router.put("/users/:userId",authorize("admin","customer"),usersControllers.getUserUpdated)
router.delete("/users/:userId",authorize("admin","customer"),usersControllers.userDeleted)

export  const usersRoutes= router