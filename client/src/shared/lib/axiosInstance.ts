import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let accessToken = "";

export function setAccessToken(token: string): void {
  accessToken = token;
}

axiosInstance.interceptors.request.use(
  (config: ExtendedAxiosRequestConfig): ExtendedAxiosRequestConfig => {
    if (!config.headers.authorization && config.headers) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    const prevRequest: ExtendedAxiosRequestConfig | undefined = error.config;

    if (error.response?.status === 403 && prevRequest && !prevRequest.sent) {
      try {
        const { data: response } = await axiosInstance.get(
          "/auth/refreshTokens"
        );

        setAccessToken(response.data.accessToken);

        prevRequest.sent = true;

        prevRequest.headers.authorization = `Bearer ${accessToken}`;

        return axiosInstance(prevRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
