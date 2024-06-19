import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join((process.cwd(), ".env")),
});

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
};

export default config;
