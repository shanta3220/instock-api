import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

/* TODO: fix all routes to use inventoryController*/

// GET inventories
router.get("/", (req, res) => {
  res.json({ message: "GET all inventories" });
});
// POST a new inventories
router.post("/", (req, res) => {
  res.json({ message: "POST a new inventories", data: req.body });
});

// GET a single inventories
router.get("/:id", (req, res) => {
  res.json({ message: `GET inventories ${req.params.id}` });
});

// PUT update a inventories
router.put("/:id", (req, res) => {
  res.json({
    message: `PUT update inventories ${req.params.id}`,
    data: req.body,
  });
});

// DELETE a inventories
router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE inventories ${req.params.id}` });
});

export default router;
