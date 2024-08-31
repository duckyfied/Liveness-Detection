const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes.js");
const morgan = require("morgan");
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));
app.use("/api/v1/user", userRouter);
module.exports = app;
