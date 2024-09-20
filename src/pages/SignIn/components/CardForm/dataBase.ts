export interface IUserAuth {
  name: string;
  cpf: string;
  password: string;
  user_type: string;
  enterprise?: {
    name: string;
  };
}

export const users: IUserAuth[] = [
  {
    name: "Admin",
    cpf: "12345678900",
    password: "admin",
    user_type: "admin",
  },
  {
    name: "User",
    cpf: "12345678901",
    password: "user",
    user_type: "user",
  },
  {
    name: "Daniel Lima",
    cpf: "17323867582",
    password: "senha",
    user_type: "user",
  },
  {
    name: "Servidor",
    cpf: "12345678902",
    password: "servidor",
    user_type: "servidor",
    enterprise: {
      name: "Organizacao teste",
    },
  },
  {
    name: "Servidor",
    cpf: "12345678903",
    password: "servidor",
    user_type: "servidor",
    enterprise: {
      name: "Organizacao teste 3",
    },
  },
];
