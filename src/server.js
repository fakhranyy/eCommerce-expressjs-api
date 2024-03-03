import morgan from "morgan";
import express from "express";
import { dbConnection } from "./config/db.js";
import dotenv from "dotenv";
import categoryRouter from "./routes/categoryRoute.js";
import { ApiError } from "./utills/apiError.js";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";
dotenv.config({ path: "config.env" });
// import './config/db.js';

// connection with db
dbConnection();

// express app
const app = express();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// routes
app.use('/api/v1/categories', categoryRouter);

// error handler for undefined routes
app.all("*",(req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400))
})

//* global error handling middleware for express
app.use(globalErrorHandler)

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("App running on port " + process.env.PORT);
});

//? handle the rejections outside express 
//! Events => listen => callback(err)
//* that let me listen on an event(unhandledRejection)
// *it return a callback function included the error
process.on("unhandledRejection",(err)=>{
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  //* we close server first, becasue if we had a pending requests in our server we'll integrate with them first, so we stop the application After we has close the server(after finishing all reqs)
  server.close(()=>{
  console.error(`Shutting down...`);
    process.exit(1); // exit the current application
  });
})