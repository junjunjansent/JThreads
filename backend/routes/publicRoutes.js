// import express from "express";
// const publicRoutes = express.Router();

// import { registerUser, loginUser } from "../controllers/publicController";

// publicRoutes.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });
// publicRoutes.post("/register", registerUser);
// publicRoutes.post("/login", loginUser);

// export default publicRoutes;

const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/publicController");

router.post("/sign-up", signUp);

module.exports = router;
