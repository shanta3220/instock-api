import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

/* TODO: fix all routes to use inventoryController*/

// GET inventories
router.get("/", inventoryController.getAllInventory);

// POST a new inventories
router.post("/", inventoryController.createInventory);

// GET a single inventories
router.get("/:id", inventoryController.getSingleInventory);

// PUT update a inventories
router.put("/:id", inventoryController.updateInventory);

// DELETE a inventories
router.delete("/:id", inventoryController.deleteInventory);

export default router;
