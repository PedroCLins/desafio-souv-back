import { Request, Response, NextFunction } from "express";
import { ItemRepository } from "@repositories";
import { CreateItem, UpdateItem } from "@DTOs";

interface Data {
    name: string;
    quantity: number;
    category: "Fruta" | "Legume" | "Padaria" | "Carne" | "Bebida";
    unit: "Un." | "L" | "Kg";
}

const categoriesFromClient = {
    "Fruta": "FRUIT" as const,
    "Legume": "LEGUME" as const,
    "Padaria": "BAKERY" as const,
    "Carne": "MEAT" as const,
    "Bebida": "DRINK" as const,
}

const unitsFromClient = {
    "Un.": "UNIT" as const,
    "L": "LITER" as const,
    "Kg": "KG" as const,
}

const categoriesFromServer = {
    "FRUIT": "fruta" as const,
    "LEGUME": "legume" as const,
    "BAKERY": "padaria" as const,
    "MEAT": "carne" as const,
    "DRINK": "bebida" as const,
}

const unitsFromServer = {
    "UNIT": "unidade" as const,
    "LITER": "litro" as const,
    "KG": "kg" as const,
}

class ItemController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: Data = req.body;
            const formattedData = CreateItem.parse({
                ...data,
                category: categoriesFromClient[data.category],
                unit: unitsFromClient[data.unit],
            });
            const item = await ItemRepository.create(formattedData);
            res.locals = {
                status: 201,
                message: "Item created successfully",
                data: item,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id }  = req.params;
            const data: Partial<Data> = req.body;
            const formattedData = UpdateItem.parse({
                ...data,
                category: data.category ? categoriesFromClient[data.category] : undefined,
                unit: data.unit ? unitsFromClient[data.unit] : undefined,
            });
            const item = await ItemRepository.update(id, formattedData);
            res.locals = {
                status: 200,
                message: "Item updated successfully",
                data: item,
            };

            return next();
        } catch (error) {
            return next(error);
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

            return next()
        } catch (error) {
            return next(error);
        }
    }
    
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id }  = req.params;
            const item = await ItemRepository.findById(id);
            const formattedItem = {
                ...item,
                category: item ? categoriesFromServer[item.category] : undefined,
                unit: item ? unitsFromServer[item.unit] : undefined,
            }
            res.locals = {
                status: 200,
                message: "Item retrieved successfully",
                data: formattedItem,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await ItemRepository.findAll();
            const formattedItems = items.map(item => ({
                ...item,
                category: categoriesFromServer[item.category],
                unit: unitsFromServer[item.unit],
            }));
            res.locals = {
                status: 200,
                message: "Items retrieved successfully",
                data: formattedItems,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }
}

export default new ItemController();