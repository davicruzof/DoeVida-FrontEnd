import axios from "axios";

export const BaseUrl = "https://doevidaapi.azurewebsites.net/api";

export const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
