import { Request, Response, NextFunction } from 'express';
import { ShoppingListRepository } from '@repositories';
import { CreateShoppingList, UpdateShoppingList } from '@DTOs';

class ShoppingListController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = CreateShoppingList.parse(req.body);
            const shoppingList = await ShoppingListRepository.create(data);
            res.locals = {
                status: 201,
                message: 'Shopping list created successfully',
                data: shoppingList,
            };
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = UpdateShoppingList.parse(req.body);
            const shoppingList = await ShoppingListRepository.update(id, data);
            res.locals = {
                status: 200,
                message: 'Shopping list updated successfully',
                data: shoppingList,
            };
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await ShoppingListRepository.delete(id);
            res.locals = {
                status: 204,
                message: 'Shopping list deleted successfully',
            };
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const shoppingList = await ShoppingListRepository.findById(id);
            res.locals = {
                status: 200,
                message: 'Shopping list retrieved successfully',
                data: shoppingList,
            };
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const shoppingLists = await ShoppingListRepository.findAll();
            res.locals = {
                status: 200,
                message: 'Shopping lists retrieved successfully',
                data: shoppingLists,
            };
        } catch (error) {
            next(error);
        }
    }
}

export default new ShoppingListController();