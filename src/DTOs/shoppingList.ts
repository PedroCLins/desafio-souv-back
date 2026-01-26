import { z } from "zod";

export const CreateShoppingList = z.object({
    name: z
        .string({
            invalid_type_error: "O nome da lista de compras deve ser uma string",
            required_error: "O nome da lista de compras é obrigatório",
        })
        .min(1, { message: "O nome da lista de compras não pode estar vazio" }),
});

export const UpdateShoppingList = CreateShoppingList.partial();

export type CreateShoppingListType = z.infer<typeof CreateShoppingList>;
export type UpdateShoppingListType = z.infer<typeof UpdateShoppingList>;