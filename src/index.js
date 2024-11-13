import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Going for some API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
