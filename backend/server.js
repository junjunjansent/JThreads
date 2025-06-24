const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const { errorHandler } = require("./utils/errorHandler");

// ----- dotenv config
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.BACKEND_PORT || 3000;

// ----- Import routers
const publicRouter = require("./routes/publicRoutes");
// const usersRouter = require("./controllers/users");

// ----- Connect to MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// ----- Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// ----- Request checker
app.use((req, res, next) => {
  console.log("Received request:", req.method, req.url);
  next();
});

// ----- Routes
app.use("/api", publicRouter);
// app.use("/api/users", usersRouter);
// app.use("/api/products", productRouter);
app.use(errorHandler);

// ----- Listen to port
const handleServerError = (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Warning! Port ${port} is already in use!`);
  } else {
    console.log("Error:", err);
  }
};

app
  .listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  })
  .on("error", handleServerError);

// import express from "express";
// // const express = require("express");
// import publicRoutes from "./routes/publicRoutes.js";
// import userRoutes from "./routes/userRoutes";
// import { isSignedIn } from "./middleware/authenticator";

// // config mongoose
// import mongoose from "mongoose";
// if (!process.env.MONGODB_URI) {
//   throw new Error("Not Connected to Database");
// }
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connection.on("connected", () => {
//   console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
// });

// // can include for debug in server.ts
// mongoose.set("debug", true);

// const app = express();
// const port = process.env.BACKEND_PORT ?? 3000;

// // middlewares if any
// app.use(express.json());

// app.use("/", publicRoutes);
// app.use(isSignedIn);
// // make sure that specific routes are placed before this, if not :userId will anyhow identify them
// app.use("/:userId", userRoutes);

// // routes
// // app.get("/", (req: Request, res: Response) => {
// //   res.send("<h1>Hello World!</h1>");
// // });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
