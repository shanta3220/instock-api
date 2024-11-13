import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const findOne = async (req, res) => {
    const warehouseId = req.params.id;

    try {
        const warehouseFound = await knex("warehouses").where({ id: warehouseId });

        if (warehouseFound.length === 0) {
            return res.status(404).json({
                message: `Warehouse with ID ${warehouseId} not found`
            });
        }

        const { created_at, updated_at, ...warehouseData } = warehouseFound[0];

        res.status(200).json(warehouseData);

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: `Unable to retrieve warehouse data for warehouse with ID ${warehouseId}`
        });
    }
};

export { findOne }