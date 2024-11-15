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

//POST to create a new warehouse
const add = async (req, res) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  //vatidate request body
  if (
    !warehouse_name.trim() ||
    !address.trim() ||
    !city.trim() ||
    !country.trim() ||
    !contact_name.trim() ||
    !contact_position.trim() ||
    !contact_phone.trim() ||
    !contact_email.trim()
  ) {
    return res.status(400).json({
      message:
        "All feilds are required warehouse_id, item_name, description, category, status and quantity",
    });
  }

  try {
    const warehouseExists = await knex("warehouses")
      .where({ warehouse_name: warehouse_name })
      .first();

    if (warehouseExists) {
      return res.status(400).json({
        message: `Warehouse with Name ${warehouse_name} already exists`,
      });
    }
    const result = await knex("warehouses").insert({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });

    const id = result[0];
    const { created_at, updated_at, ...newWarehouse } = await knex("warehouses")
      .where({ id })
      .first();
    res.status(201).json(newWarehouse);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Failed to create a new warehouse",
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
// Delete a warehouse
const deleteWarehouse = async (req, res) => {
  try {
    const selectedWarehouse = await db("warehouses").where({
      id: req.params.id,
    });
    if (!selectedWarehouse.length) {
      return res.status(404).json({ message: "Warehouse does not exist!" });
    }
    await db("warehouse")
      .where({
        id: selectedWarehouse[0].id,
      })
      .del();
    res.sendStatus(204);
  } catch {
    res.status(500).json({ error: error });
  }
};

export { getAllWarehouses, add, findOne, inventories, deleteWarehouse };
