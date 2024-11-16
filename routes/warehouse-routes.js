import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

router
  .route("/")
  .get(warehouseController.getAllWarehouses)
  .post(warehouseController.add);

router
  .route("/:id")
  .get(warehouseController.findOne)
  .put(warehouseController.update)
  .delete(warehouseController.deleteWarehouse);

router.route("/:id/inventories").get(warehouseController.inventories);

export default router;
