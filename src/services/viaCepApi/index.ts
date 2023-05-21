import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export const getAddress = async (cepValue: string) => {
  try {
    const { data } = await api.get(`${cepValue}/json/`);
    return data;
  } catch (err) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { error } = (err as AxiosError<any, any>)?.response?.data;
    throw new Error(error);
  }
};
