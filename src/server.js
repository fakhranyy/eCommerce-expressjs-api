import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./config/db.js";
import categoryRoute from "./routes/categoryRoute.js";
import subCategoryRoute from "./routes/subCategoryRoute.js";
import brandRoute from "./routes/brandRoute.js";
import { ApiError } from "./utils/apiError.js";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";
dotenv.config();

// express app
const app = express();

//? Always we use middlewares before Routes
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //* when we need to trigger a middleware we use (app.use(middleware))
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalErrorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `App running on port ${process.env.PORT} on ${process.env.NODE_ENV} mode`
  );
});

// to handle all errors outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shuting down....`);
    process.exit(1); // exit from the application after closing the server becase if i had pending requests , i finished it first then close the server
  });
});
