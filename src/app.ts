

import express, { Application } from "express"

const app:Application = express()


// middleware 

app.use(express.json());
// app.use()


app.get("/",(req,res)=>{
  res.status(200).json({
    success : true,
    message : "Hospital Management system api is running"
  })
})


// app.use("/api/v1");




// Not found api

// Global error handler

export default app;