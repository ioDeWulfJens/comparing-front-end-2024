declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'test' | 'production';
    DB_NAME: string;
    DB_VERSION: string;
  }
}