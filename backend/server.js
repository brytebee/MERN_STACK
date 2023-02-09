const express = require("express");
const workoutRoutes = require("./routes/workoutRoutes");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

// Middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Off deprecation warning
mongoose.set("strictQuery", true);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(
      process.env.PORT,
      console.log("DB connected & Listening on PORT", process.env.PORT)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
