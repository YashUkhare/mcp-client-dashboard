const env = (import.meta as ImportMeta & {
  env?: {
    NG_APP_API_URL?: string;
  };
}).env;

export const environment = {
  production: false,
  apiUrl: env?.NG_APP_API_URL ?? 'http://localhost:8080/api'
};
