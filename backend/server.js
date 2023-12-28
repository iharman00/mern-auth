import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import userRoutes from "./routes/user/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

configDotenv();
connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
