import morgan from "morgan";
import express from "express";
import { dbConnection } from "./config/db.js";
import dotenv from "dotenv";
import categoryRouter from "./routes/categoryRoute.js";
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

app.listen(process.env.PORT || 8000, () => {
  console.log("App running on port " + process.env.PORT);
});
