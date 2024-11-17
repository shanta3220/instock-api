import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

//Hit this route on "/warehouses"
router.route("/").get(warehouseController.index).post(warehouseController.add);

//Hit this route on "/warehouses/:id"
router
  .route("/:id")
  .get(warehouseController.findOne)
  .put(warehouseController.update)
  .delete(warehouseController.remove);

//Hit this route on "/warehouses/:id/inventories"
router.route("/:id/inventories").get(warehouseController.inventories);

export default router;
