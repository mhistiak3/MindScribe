const dotenv = require("dotenv");
dotenv.config();
const { APP_PORT, MONGO_CONNECTION_URL } = process.env;

module.exports = { APP_PORT, MONGO_CONNECTION_URL };
