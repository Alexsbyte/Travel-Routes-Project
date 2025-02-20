import { AxiosError } from 'axios';
import { IApiResponseReject } from '../types';
import { defaultRejectedAxiosError } from '../consts';

export function handleAxiosError(error: unknown): IApiResponseReject {
  if (error instanceof AxiosError) {
    if (error.code === 'ERR_CANCELED') {
      return {
        ...defaultRejectedAxiosError,
        error:
          'Время ожидания истекло. Повторите позднее или проверьте настройки интернета.',
      };
    }

    if (error.code === 'ERR_NETWORK') {
      return {
        ...defaultRejectedAxiosError,
        error: 'Ошибка подключения к серверу, повторите позднее',
      };
    }

    if (error.response) {
      return error.response.data;
    }
  }

  return defaultRejectedAxiosError;
}
