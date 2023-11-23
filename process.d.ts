declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'test' | 'production';
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    AUTH0_SECRET: string;
    AUTH0_BASE_URL: string;
    AUTH0_REDIRECT_URI: string;
    AUTH0_AUDIENCE: string;
  }
}