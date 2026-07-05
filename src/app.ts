

import express, { Application } from "express"
import router from "./app/router/index.js";

const app:Application = express()


// middleware 

app.use(express.json());



app.get("/",(req,res)=>{
  res.status(200).json({
    success : true,
    message : "Hospital Management system api is running"
  })
})


app.use("/api/v1",router);




// Not found api

// Global error handler

export default app;