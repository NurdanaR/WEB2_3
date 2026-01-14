const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // чтобы index.html открывался

app.use("/api/blogs", blogRoutes);

// Подключение к MongoDB только один раз
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const Blog = require("./models/Blog");
    console.log("Blog model:", Blog); // должно показать [Function: model]
  })
  .catch(err => console.error("MongoDB error:", err));

console.log("MONGO_URI:", process.env.MONGO_URI);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
