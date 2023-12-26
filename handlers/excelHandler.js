const { connectDatabase, promisePool } = require("../config/database");
const exceljs = require("exceljs");

exports.home = async (req, res, next) => {
  res.json("You can upload your excel file here");
};

exports.upload = async (req, res, next) => {
  console.log("received fille: ", req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }
  const excelFile = req.files.excelFile;

  try {
    //fucntion to handle excel file process
    const data = await processExcel(excelFile);

    //function to insert data into MySQL
    await insertDataIntoMySQL(data);

    res.send("file uploaded and data inserted into MySQL");
  } catch (error) {
    console.error("error in processing/uploading excel file", error);
    res.status(500).send("Internal server error");
  }
};

async function processExcel(file) {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.load(file.data);

  const worksheet = workbook.getWorksheet(1);
  const data = [];
  //first row contains headers, and data starts from sencond 2
  for (let i = 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);
    const rowData = {};

    //the columns in excel map to columns in mysql
    rowData.Name = row.getCell(1).value;
    rowData.Age = row.getCell(2).value;
    rowData.DOB = row.getCell(3).value;
    rowData.Address = row.getCell(4).value;

    data.push(rowData);
  }

  return data;
}

async function insertDataIntoMySQL(data) {
  const query = "INSERT INTO emp_details (Name, Age, DOB, Address) VALUES ?";
  await promisePool.query(query, [
    data.map((item) => [item.Name, item.Age, item.DOB, item.Address]),
  ]);
}
