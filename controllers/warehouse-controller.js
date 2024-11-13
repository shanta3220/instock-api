import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const findOne = async (req, res) => {
    try {
        //const warehouseFound = await knex();

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`
        });
    }
};

export {
    findOne
}