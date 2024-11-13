import express from "express";

const router = express.Router();

// GET warehouses
router.get("/warehouses", (req, res) => {
  res.json({ message: "GET all warehouses" });
});

// GET a single warehouses
router.get("/warehouses/:id", (req, res) => {
  res.json({ message: `GET warehouses ${req.params.id}` });
});

// POST a new warehouses
router.post("/warehouses", (req, res) => {
  res.json({ message: "POST a new warehouses", data: req.body });
});

// PUT update a warehouses
router.put("/warehouses/:id", (req, res) => {
  res.json({
    message: `PUT update warehouses ${req.params.id}`,
    data: req.body,
  });
});

// DELETE a warehouses
router.delete("/warehouses/:id", (req, res) => {
  res.json({ message: `DELETE warehouses ${req.params.id}` });
});

// ---------------------------------

// GET inventories
router.get("/inventories", (req, res) => {
  res.json({ message: "GET all inventories" });
});

// GET a single inventories
router.get("/inventories/:id", (req, res) => {
  res.json({ message: `GET inventories ${req.params.id}` });
});

// POST a new inventories
router.post("/inventories", (req, res) => {
  res.json({ message: "POST a new inventories", data: req.body });
});

// PUT update a inventories
router.put("/inventories/:id", (req, res) => {
  res.json({
    message: `PUT update inventories ${req.params.id}`,
    data: req.body,
  });
});

// DELETE a inventories
router.delete("/inventories/:id", (req, res) => {
  res.json({ message: `DELETE inventories ${req.params.id}` });
});

export default router;
