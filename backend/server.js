const express = require("express");
const app = express();

const { ApiError, errorHandler } = require("./utils/errorHandler");

// ----- dotenv config
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.BACKEND_PORT || 3000;

// ----- Import routers
const publicRouter = require("./routes/publicRoutes");
const authenticateUser = require("./middlewares/authenticator");
const usersRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

// ----- Connect to MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// ----- Middleware
// cors
const cors = require("cors");
app.use(cors());
// morgan
const logger = require("morgan");
app.use(logger("dev"));

app.use(express.json());

// ----- Request checker, but morgan does this already
// app.use((req, res, next) => {
//   console.log("Received request:", req.method, req.url);
//   next();
// });

// ----- Routes
app.use("/api/public", publicRouter);
app.use(authenticateUser);
app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use((req, res, next) => {
  next(
    new ApiError({
      status: 404,
      source: { pointer: "server.js" },
      title: "Invalid Route",
      detail: "Route does not exist",
    })
  );
});
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
