export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			MONGO_URL: string;
			PORT: number;
			JWT_SECRET: string;
		}
	}
}
