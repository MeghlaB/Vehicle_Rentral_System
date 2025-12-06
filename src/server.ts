import { Request, Response } from "express"
import config from "./config"
import app from "./app"




app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
