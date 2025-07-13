import axios from "axios";
import queryClient from "~/config/query-client";
import { redirectToLogin, useCustomNavigation } from "~/lib/navigation";

const options = {
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
};

const AcessTokenRefreshClient = axios.create(options);
AcessTokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    console.error("API Error:", error);
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
      try {
        await AcessTokenRefreshClient.get("/auth/refresh");
        return AcessTokenRefreshClient(config);
      } catch (error) {
        queryClient.clear();
        const redirectUrl = window.location.pathname;
        sessionStorage.setItem("redirectUrl", redirectUrl);
        redirectToLogin();
      }
    }

    return Promise.reject({ status, data });
  }
);

export default API;
