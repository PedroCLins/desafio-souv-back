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

    async findAll() {
        const items = await prisma.item.findMany();
        return items;
    }
}

export default new ItemRepository();