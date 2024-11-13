import express from "express";
import "dotenv/config";
import initKnex from "knex";
import configuration from "./knexfile.js";
import cors from "cors";
import warehouseRoutes from "./routes/warehouse-routes.js";
import inventoryRoutes from "./routes/inventory-routes.js";

const knex = initKnex(configuration);

const app = express();
app.use(cors());
app.use(express.json());

const { PORT, DB_HOST } = process.env;

app.get("/", (_req, res) => {
    res.json({ message: "Welcome! to InstockApi!" });
});

app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventories", inventoryRoutes);

app.listen(PORT, () => {
    console.log(knex.client.config);
    console.log(`Listening at http://${DB_HOST}:${PORT}`);
})