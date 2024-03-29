import express from "express";
import path from "path";
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

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
