import prisma from "@database";
import { CreateShoppingListType, UpdateShoppingListType } from "@DTOs";

class ShoppingListRepository {
    async create(data: CreateShoppingListType) {
        const shoppingList = await prisma.shoppingList.create({
            data,
        });
        return shoppingList;
    }
    
    async update(id: string, data: UpdateShoppingListType) {
        const shoppingList = await prisma.shoppingList.update({
            where: { id },
            data,
        });
        return shoppingList;
    }
    
    async delete(id: string) {
        await prisma.shoppingList.delete({
            where: { id },
        });
    }

    async findById(id: string) {
        const shoppingList = await prisma.shoppingList.findUnique({
            where: { id },
        });
        return shoppingList;
    }

    async findAll() {
        const shoppingLists = await prisma.shoppingList.findMany();
        return shoppingLists;
    }
}

export default new ShoppingListRepository();