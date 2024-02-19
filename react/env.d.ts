namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'test' | 'production'
        NEXT_PUBLIC_URL: string
        NEXT_PUBLIC_DB_NAME: string
        NEXT_PUBLIC_DB_VERSION: number
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    }
}