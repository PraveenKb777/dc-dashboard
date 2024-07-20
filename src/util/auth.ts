import axios from "axios";
import ENV from "../env";
const getToken = async (): Promise<string | null> => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};

const auth = axios.create({
  baseURL: ENV.baseUrl,
  timeout: 10000,
});

auth.interceptors.request.use(async function (config) {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

auth.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default auth;
