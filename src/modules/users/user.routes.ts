

import express from "express";
import { usersControllers } from "./user.controller";
const router = express.Router()
router.post("/",usersControllers.createUser)

export  const usersRoutes= router