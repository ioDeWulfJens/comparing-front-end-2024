namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'test' | 'production'
        NEXT_PUBLIC_DB_NAME: string
        NEXT_PUBLIC_DB_VERSION: number
    }
}