import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log(`Database connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database Error: ${err}`);
      process.exit(1); // exit the current application
    });
};
