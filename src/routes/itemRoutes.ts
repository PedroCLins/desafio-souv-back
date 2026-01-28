import { Router } from "express";
import { ItemController } from "@controllers";

const itemRouter = Router();

itemRouter
    .route("/")
    .post(ItemController.create)
    .get(ItemController.findAll);

itemRouter
    .route("/:id")
    .get(ItemController.findById)
    .patch(ItemController.update)
    .delete(ItemController.delete);

export default itemRouter;