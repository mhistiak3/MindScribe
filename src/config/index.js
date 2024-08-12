const dotenv = require("dotenv");
dotenv.config();
const { APP_PORT, MONGO_CONNECTION_URL, SESSION_SECRET, SESSION_MAX_AGE } =
  process.env;

module.exports = {
  APP_PORT,
  MONGO_CONNECTION_URL,
  SESSION_SECRET,
  SESSION_MAX_AGE,
};
