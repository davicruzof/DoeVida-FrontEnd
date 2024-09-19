import { formatToCNPJ } from "brazilian-values";
import { z } from "zod";

export const createEnterpriseFormSchema = z.object({
  enterpriseName: z.string().nonempty("O nome da organização é obrigatorio"),
  cnpj: z
    .string()
    .nonempty("O cnpj é obrigatório")
    .transform((val) => formatToCNPJ(val)),
  phoneNumber: z.string().nonempty("O telefone é obrigatório"),
  cep: z
    .string()
    .nonempty("Informe o seu cep")
    .min(8, "O seu cep deve conter 8 números"),
  uf: z.string().nonempty("Informe um estado"),
  city: z.string().nonempty("Informe uma cidade"),
  street: z.string().nonempty("Informe um logradouro (rua, avenida, povoado)"),
  number: z.string().nonempty("Informe o número"),
  neighborhood: z.string().nonempty("Informe um bairro"),
  complement: z.string(),
});

export type CreateEnterpriseProps = z.infer<typeof createEnterpriseFormSchema>;
