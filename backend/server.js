const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const redis = require("./config/redis");

const app = express();

redis();
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mentor-project.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
