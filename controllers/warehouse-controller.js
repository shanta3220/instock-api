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
  try {
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
      !warehouse_name?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !country?.trim() ||
      !contact_name?.trim() ||
      !contact_position?.trim() ||
      !contact_phone?.trim() ||
      !contact_email?.trim()
    ) {
      return res.status(400).json({
        message:
          "All fields are required warehouse_name, address, city,country, contact_name, contact_position, contact_phone and contact_email. Fields also can't be empty or have whitespace",
      });
    }

    const isPhoneValid =
      /^\+?[1-9]\d{0,2}\s?(\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,4}[-\s]?\d{1,4}$/g.test(
        contact_phone
      );

    if (!isPhoneValid) {
      return res.status(400).json({
        message: "contact_phone is invalid",
      });
    }

    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(contact_email);

    if (!isEmailValid) {
      return res.status(400).json({
        message: "contact_email is invalid",
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

// put/ edit a warehouse
const update = async (req, res) => {
  const warehouseId = req.params.id;
  try {
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
      !warehouse_name?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !country?.trim() ||
      !contact_name?.trim() ||
      !contact_position?.trim() ||
      !contact_phone?.trim() ||
      !contact_email?.trim()
    ) {
      return res.status(400).json({
        message:
          "All feilds are required warehouse_name, address, city,country, contact_name, contact_position, contact_phone and contact_email. Fields also can't be empty or have whitespace",
      });
    }

    const isPhoneValid =
      /^\+?[1-9]\d{0,2}\s?(\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,4}[-\s]?\d{1,4}$/g.test(
        contact_phone
      );

    if (!isPhoneValid) {
      return res.status(400).json({
        message: "contact_phone is invalid",
      });
    }

    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(contact_email);

    if (!isEmailValid) {
      return res.status(400).json({
        message: "contact_email is invalid",
      });
    }

    const rowsUpdated = await knex("warehouses")
      .where({ id: warehouseId })
      .update({
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      });

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${warehouseId} not found`,
      });
    }

    const warehouseFound = await knex("warehouses").where({ id: warehouseId });
    const { created_at, updated_at, ...warehouseData } = warehouseFound[0];
    res.status(200).json(warehouseData);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: `Unable to update warehouse data for warehouse with ID ${warehouseId}`,
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
    const selectedWarehouse = await knex("warehouses").where({
      id: req.params.id,
    });
    if (!selectedWarehouse.length) {
      return res.status(404).json({ message: "Warehouse does not exist!" });
    }
    await knex("warehouse")
      .where({
        id: selectedWarehouse[0].id,
      })
      .del();
    res.sendStatus(204);
  } catch {
    res.status(500).json({ error: error });
  }
};

export { getAllWarehouses, add, update, findOne, inventories, deleteWarehouse };
