import { AxiosError } from "axios";
import { api } from "../api";
import { ISignProps } from "./types";

export const signIn = async (
  credentials: ISignProps
): Promise<{ token: string }> => {
  try {
    const { data } = await api.post("/Auth/login", credentials);
    return data;
  } catch (err) {
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
