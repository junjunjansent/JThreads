const express = require("express");
const app = express();
// const cors = require("cors");
// const logger = require("morgan");
const { ApiError, errorHandler } = require("./utils/errorHandler");

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
// app.use(cors());
app.use(express.json());
// app.use(logger("dev"));

// ----- Request checker
app.use((req, res, next) => {
  console.log("Received request:", req.method, req.url);
  next();
});

// ----- Routes
app.use("/api", publicRouter);
// app.use("/api/users", usersRouter);
// app.use("/api/products", productRouter);
app.use((req, res, next) => {
  next(
    new ApiError({
      status: {
        status: "404",
        source: { pointer: "server.js" },
        title: "Invalid Route",
        detail: "Route does not exist",
      },
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
