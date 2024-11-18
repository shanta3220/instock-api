import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

//Hit this route on "/inventories"
router.route("/").get(inventoryController.index).post(inventoryController.add);

//Hit this route on "/inventories/:id"
router
  .route("/:id")
  .get(inventoryController.findOne)
  .put(inventoryController.update)
  .delete(inventoryController.remove);

export default router;
