require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/adoptions", adoptionRoutes);

app.get("/", (req, res) => {
  res.send("PawConnect API is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});