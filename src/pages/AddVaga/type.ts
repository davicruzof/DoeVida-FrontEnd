import { z } from "zod";

export const createItemFormSchema = z.object({
  enterpriseName: z.string().nonempty("O nome da organização é obrigatorio"),
  day: z.string().nonempty("Informe o dia da semana"),
  vagas_quantity: z.string().nonempty("Informe a quantidade de vagas"),
  hour_init: z.string().nonempty("Informe o horário"),
  hour_end: z.string().nonempty("Informe o horário"),
});

export type CreateItemProps = z.infer<typeof createItemFormSchema>;
