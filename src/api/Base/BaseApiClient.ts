import axios from "axios";

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export const AIPlaygroundApiClient = axios.create({
  baseURL: "https://localhost:7230/api/",
  headers: defaultHeaders,
});
