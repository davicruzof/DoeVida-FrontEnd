import { formatToCPF } from "brazilian-values";
import { z } from "zod";

export const authSchema = z.object({
  password: z.string().nonempty("A senha é obrigatória"),
  cpf: z
    .string()
    .nonempty("O cpf é obrigatório")
    .transform((val) => {
      formatToCPF(val);
    }),
});

export type authProps = z.infer<typeof authSchema>;
