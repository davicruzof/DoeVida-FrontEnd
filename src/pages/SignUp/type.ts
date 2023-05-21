import { z } from "zod";

export const createUserFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatorio"),
  email: z.string(),
  phone: z.string().nonempty("O telefone é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
  cpf: z.string().nonempty("O cpf é obrigatório"),
  birthDay: z.string().nonempty("Informe a sua data de nascimento"),
});

export type CreateUserProps = z.infer<typeof createUserFormSchema>;
