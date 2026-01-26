import { Router } from "express";
import { ShoppingListController } from "@controllers";

const shoppingListRouter = Router();

shoppingListRouter
  .route("/")
  .post(ShoppingListController.create)
  .get(ShoppingListController.findAll);

shoppingListRouter
  .route("/:id")
  .get(ShoppingListController.findById)
  .patch(ShoppingListController.update)
  .delete(ShoppingListController.delete);

export default shoppingListRouter;