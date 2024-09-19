import { z } from "zod";

export const createItemFormSchema = z.object({
  enterpriseName: z.string().nonempty("O nome da organização é obrigatorio"),
  itemName: z.string().nonempty("Informe o nome do item"),
  typeItem: z.string().nonempty("Informe o tipo do item"),
});

export type CreateItemProps = z.infer<typeof createItemFormSchema>;
