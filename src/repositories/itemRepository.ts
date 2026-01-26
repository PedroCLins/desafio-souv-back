import prisma from "@database";
import { CreateItemType, UpdateItemType } from "@DTOs";

class ItemRepository {
    async create(data: CreateItemType) {
        const item = await prisma.item.create({
            data,
        });
        return item;
    }
    
    async update(id: string, data: UpdateItemType) {
        const item = await prisma.item.update({
            where: { id },
            data,
        });
        return item;
    }
    
    async delete(id: string) {
        await prisma.item.delete({
            where: { id },
        });
    }

    async findById(id: string) {
        const item = await prisma.item.findUnique({
            where: { id },
        });
        return item;
    }

    async findByShoppingListId(shoppingListId: string) {
        const items = await prisma.item.findMany({
            where: { shoppingListId },
        });
        return items;
    }
}

export default new ItemRepository();