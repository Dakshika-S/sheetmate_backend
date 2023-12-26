const mysql = require("mysql2");
const { Connection } = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Dak@1999",
  database: "sheetmate",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

const connectDatabase = () => {
  pool.getConnection((err, Connection) => {
    if (err) {
      console.error("error connecting to Mysql:" + err.message);
      return;
    }
    console.log("connected");
    Connection.release();
  });
};

module.exports = { promisePool, connectDatabase };
