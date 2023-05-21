import dotenv from "dotenv";
dotenv.config();

const config = {
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUrl: process.env.DB_URL,
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
};

export default config;
