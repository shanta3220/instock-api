import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    // todo: use warehouseController to fetch all warehouses
    res.json({ message: "GET all warehouses" });
  })
  .post((req, res) => {
    // todo: post a new warehouse using warehouse
    res.json({ message: "POST a new warehouses", data: req.body });
  });

// GET a single warehouses
router
  .route("/:id")
  .get(warehouseController.findOne)
  .patch((req, res) => {
    // todo: use warehouseController to edit specific warehouse
    res.json({
      message: `PUT update warehouses ${req.params.id}`,
      data: req.body,
    });
  })
  .delete((req, res) => {
    // todo: use warehouseController to delete specific warehouse
    res.json({ message: `DELETE warehouses ${req.params.id}` });
  });

export default router;
