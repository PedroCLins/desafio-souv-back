import { Request, Response, NextFunction } from "express";
import { ItemRepository } from "@repositories";
import { CreateItem, UpdateItem } from "@DTOs";

class ItemController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = CreateItem.parse(req.body);
            const item = await ItemRepository.create(data);
            res.locals = {
                status: 201,
                message: "Item created successfully",
                data: item,
            };
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id }  = req.params;
            const data = UpdateItem.parse(req.body);
            const item = await ItemRepository.update(id, data);
            res.locals = {
                status: 200,
                message: "Item updated successfully",
                data: item,
            };
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id }  = req.params;
            await ItemRepository.delete(id);
            res.locals = {
                status: 204,
                message: "Item deleted successfully",
            }
        } catch (error) {
            next(error);
        }
    }
    
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id }  = req.params;
            const item = await ItemRepository.findById(id);
            res.locals = {
                status: 200,
                message: "Item retrieved successfully",
                data: item,
            };
        } catch (error) {
            next(error);
        }
    }

    async findByShoppingListId(req: Request, res: Response, next: NextFunction) {
        try {
            const { shoppingListId }  = req.params;
            const items = await ItemRepository.findByShoppingListId(shoppingListId);
            res.locals = {
                status: 200,
                message: "Items retrieved successfully",
                data: items,
            };
        } catch (error) {
            next(error);
        }
    }
}

export default new ItemController();