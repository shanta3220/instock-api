import express from "express";
import "dotenv/config";
import initKnex from "knex";
import configuration from "./knexfile.js";
import cors from "cors";
import apiRoutes from "./routes/api.js";
const knex = initKnex(configuration);

const app = express();
app.use(cors());
app.use(express.json());

const { PORT, DB_HOST } = process.env;

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
    res.json({ message: "Going for some API" });
});

app.listen(PORT, () => {
    console.log(knex.client.config);
    console.log(`Listening at http://${DB_HOST}:${PORT}`);
})