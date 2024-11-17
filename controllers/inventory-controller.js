import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// GET - list of all inventory
const index = async (req, res) => {
  try {
    const inventoryItems = await knex("inventories")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id");

    res.status(200).json(inventoryItems);
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res.status(500).json({ message: "Unable to retrieve inventory data" });
  }
};

//PUT - update the inventory item

const update = async (req, res) => {
  const { id } = req.params;
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  // Check if all required fields are present
  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    quantity === undefined
  ) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  // Validate if quantity is a number
  if (isNaN(quantity)) {
    return res.status(400).json({
      message: "Quantity must be a number",
    });
  }

  try {
    // Update the inventory item in the database
    const updateCount = await knex("inventories").where({ id }).update({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    });

    if (updateCount === 0) {
      return res.status(404).json({
        message: `Inventory item with ID ${id} not found`,
      });
    }

    // Retrieve the updated inventory item
    const { created_at, updated_at, ...updatedInventory } = await knex(
      "inventories"
    )
      .where({ id })
      .first(); // Retrieve the updated item

    // Return the updated inventory item
    res.status(200).json(updatedInventory);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Failed to update inventory item",
    });
  }
};

//POST to post a new inventory item
const add = async (req, res) => {
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  //vatidate request body
  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity === undefined
  ) {
    return res.status(400).json({
      message:
        "All feilds are required warehouse_id, item_name, description, category, status and quantity",
    });
  }
  //validate the quantity is a number
  if (isNaN(quantity)) {
    return res.status(400).json({
      message: "Quantity must be a valid number",
    });
  }
  try {
    const warehouseExists = await knex("warehouses")
      .where({ id: warehouse_id })
      .first();

    if (!warehouseExists) {
      return res.status(400).json({
        message: `Warehouse with ID ${warehouse_id} does not exist.`,
      });
    }
    await knex("inventories").insert({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    });

    const { created_at, updated_at, ...newInventory } = await knex(
      "inventories"
    )
      .where({ warehouse_id, item_name })
      .first();

    res.status(201).json(newInventory);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Failed to create a new inventory item",
    });
  }
};

const remove = async (req, res) => {
  try {
    const selectedInventory = await knex("inventories").where({
      id: req.params.id,
    });

    if (!selectedInventory.length) {
      return res.status(404).json({ message: "Inventory item does not exist" });
    }
    await knex("inventories").where({ id: selectedInventory[0].id }).del();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
// GET a single inventory item
const findOne = async (req, res) => {
  try {
    const singleInventory = await knex("inventories")
      .where({
        id: req.params.id,
      })
      .first();

    if (singleInventory) {
      const { created_at, updated_at, ...inventoryData } = singleInventory;
      return res.status(200).json(inventoryData);
    }

    return res.status(404).json({
      message: `Inventory item with ID ${req.params.id} does not exist`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: `Could not retrieve inventory data for the inventory with an ID of ${req.params.id}`,
    });
  }
};

export { index, update, add, findOne, remove };
