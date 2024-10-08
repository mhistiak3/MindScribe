const dotenv = require("dotenv");
dotenv.config();
const {
  APP_PORT,
  MONGO_CONNECTION_URL,
  SESSION_SECRET,
  SESSION_MAX_AGE,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

module.exports = {
  APP_PORT,
  MONGO_CONNECTION_URL,
  SESSION_SECRET,
  SESSION_MAX_AGE,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
