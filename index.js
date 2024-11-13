/* No controllers yet, just for testing knex's configuration*/
import initKnex from "knex";
import configuration from "./knexfile.js";
const knex = initKnex(configuration);

import express from "express";
import "dotenv/config";

const app = express();

const { PORT, DB_HOST } = process.env;

app.listen(PORT, () => {
    console.log(knex.client.config);
    console.log(`Listening at http://${DB_HOST}:${PORT}`);
})