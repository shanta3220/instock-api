import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

router
  .route("/")
  .get(warehouseController.getAllWarehouses)
  .post(warehouseController.add);

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

router.route("/:id/inventories").get(warehouseController.inventories);

export default router;
