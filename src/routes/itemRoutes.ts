import { Router } from "express";
import { ItemController } from "@controllers";

const itemRouter = Router();

itemRouter
    .route("/")
    .post(ItemController.create)

itemRouter
    .route("/:id")
    .get(ItemController.findById)
    .patch(ItemController.update)
    .delete(ItemController.delete);

itemRouter
    .route("/shopping-list/:shoppingListId")
    .get(ItemController.findByShoppingListId);

export default itemRouter;