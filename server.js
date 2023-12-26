const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const { connectDatabase, promisePool } = require("./config/database");
const { log } = require("console");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server listening on to the port: ${process.env.PORT}`);
});
