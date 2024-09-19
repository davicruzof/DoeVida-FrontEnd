import * as React from "react";

export interface IAuth {
  signed: boolean;
  enterprise?: {
    name: string;
  };
  user_type: string;
  user: {
    name: string;
    cpf: string;
  };
}

export interface IAuthContextProps {
  authValues: IAuth;
  setAuthValues: React.Dispatch<React.SetStateAction<IAuth>>;
}

export const AuthContext = React.createContext<IAuthContextProps>({
  authValues: {} as IAuth,
  setAuthValues: () => null,
});

export const AppContextProvider = AuthContext.Provider;
