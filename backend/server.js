// import express from "express";
// // const express = require("express");
// import publicRoutes from "./routes/publicRoutes.js";
// import userRoutes from "./routes/userRoutes";
// import { isSignedIn } from "./middleware/authenticator";

// // config dotenv
// import dotenv from "dotenv";
// dotenv.config();

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
