namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'test' | 'production'
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        PUBLIC_LOCALE: "en" | "nl"
    }
}