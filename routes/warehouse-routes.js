import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

router
  .route("/")
  .get(warehouseController.getAllWarehouses)
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
  //use warehouseController to delete specific warehouse
  .delete(warehouseController.deleteWarehouse);

router.route("/:id/inventories").get(warehouseController.inventories);

export default router;
