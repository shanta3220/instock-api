import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

//GET all warehouses
const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await knex("warehouses");

    if (warehouses.length === 0) {
      return res.status(404).json({
        message: "No warehouses found",
      });
    }
    const warehousesData = warehouses.map(({ ...warehouse }) => warehouse);

    res.status(200).json(warehousesData);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Unable to retrieve warehouse data",
    });
  }
};

// get a specific warehouse
const findOne = async (req, res) => {
  const warehouseId = req.params.id;

  try {
    const warehouseFound = await knex("warehouses").where({ id: warehouseId });

    if (warehouseFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${warehouseId} not found`,
      });
    }

    const { created_at, updated_at, ...warehouseData } = warehouseFound[0];

    res.status(200).json(warehouseData);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${warehouseId}`,
    });
  }
};

// get inventories for a given warehouse
const inventories = async (req, res) => {
  const warehouseId = req.params.id;
  try {
    const inventoriesFound = await knex("inventories")
      .select("id", "item_name", "category", "status", "quantity")
      .where({
        warehouse_id: warehouseId,
      });

    if (inventoriesFound.length === 0) {
      return res.status(404).json({
        message: `Inventories not found for the Warehouse with ID ${warehouseId}`,
      });
    }

    res.status(200).json(inventoriesFound);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: `Unable to retrieve inventories data for warehouse with ID ${warehouseId}`,
    });
  }
};

export { getAllWarehouses, findOne, inventories };
