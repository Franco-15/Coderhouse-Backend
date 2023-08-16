import dotenv from "dotenv";
dotenv.config();

const config = {
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUrl: process.env.DB_URL,
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackUrl: process.env.GITHUB_CALLBACK_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtCookieName: process.env.JWT_COOKIE_NAME,
  persistance: process.env.PERSISTANCE,
  email:{
    service: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    restore_pass_token: process.env.RESTORE_PASSWORD_TOKEN,
    restore_pass_secret: process.env.RESTORE_PASSWORD_SECRET,
  }
};

export default config;
