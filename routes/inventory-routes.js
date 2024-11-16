import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

/* TODO: fix all routes to use inventoryController*/

// GET inventories
router.get("/", (req, res) => {
  res.json({ message: "GET all inventories" });
});

// POST a new inventories
router.post("/", inventoryController.createInventory);

// GET a single inventories
router.get("/:id", inventoryController.getSingleInventory);

// PUT update a inventories
router.put("/:id", inventoryController.updateInventory);

// DELETE a inventories
router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE inventories ${req.params.id}` });
});

export default router;
