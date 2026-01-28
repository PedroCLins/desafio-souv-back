import { z } from "zod";

const ItemType = z.enum(["FRUIT", "LEGUME", "DRINK", "MEAT", "BAKERY"], {
    invalid_type_error: "O tipo do item é inválido",
    required_error: "O tipo do item é obrigatório",
});

const UnitType = z.enum(["KG", "UNIT", "LITER"], {
    invalid_type_error: "A unidade do item é inválida",
    required_error: "A unidade do item é obrigatória",
});

export const CreateItem = z.object({
    name: z
        .string({
            invalid_type_error: "O nome do item deve ser uma string",
            required_error: "O nome do item é obrigatório",
        })
        .min(1, { message: "O nome do item não pode estar vazio" }),
    category: ItemType,
    quantity: z.
        number({
            invalid_type_error: "A quantidade deve ser um número",
            required_error: "A quantidade é obrigatória",
        })
        .int({ message: "A quantidade deve ser um número inteiro" })
        .nonnegative({ message: "A quantidade não pode ser negativa" }),
    unit: UnitType,
});

export const UpdateItem = CreateItem.partial();

export type CreateItemType = z.infer<typeof CreateItem>;
export type UpdateItemType = z.infer<typeof UpdateItem>;