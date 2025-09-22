import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    clientURL: process.env.clientURL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
};