import { z } from "zod";

export const createUserFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatorio"),
  email: z.string(),
  phone: z.string().nonempty("O telefone é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
  cpf: z.string().nonempty("O cpf é obrigatório"),
  birthDay: z.string().nonempty("Informe a sua data de nascimento"),
  cep: z
    .string()
    .nonempty("Informe o seu cep")
    .min(8, "O seu cep deve conter 8 números"),
  uf: z.string().nonempty("Informe um estado"),
  city: z.string().nonempty("Informe uma cidade"),
  street: z.string().nonempty("Informe um logradouro (rua, avenida, povoado)"),
  number: z.string().nonempty("Informe o número"),
  bairro: z.string().nonempty("Informe um bairro"),
  complement: z.string(),
});

export type CreateUserProps = z.infer<typeof createUserFormSchema>;
