

import express, { Application } from "express"
import router from "./app/router/index.js";
import { notFound } from "./app/middleware/notFound.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";

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
app.use(notFound);

// Global error handler

app.use(globalErrorHandler)

export default app;