const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

// Import routers
// const authRouter = require("./controllers/auth");
// const testJwtRouter = require("./controllers/test-jwt");
// const usersRouter = require("./controllers/users");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
// app.use("/auth", authRouter);
// app.use("/test-jwt", testJwtRouter);
// app.use("/users", usersRouter);

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("The express app is ready!");
});

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
