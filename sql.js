const { diskStorage } = require("multer");
const mysql = require("mysql");
const { displaydata } = require("./file.js");
const xlsx = require("xlsx");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql1",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("sql connected..");
});

// function insert
function insertAll() {
  let display = displaydata();

  let arrayouter = []; //store object in array
  for (let data of display) {
    let array = [];
    array.push(data["name"]);
    array.push(data["email"]);
    array.push(data["phone"]);
    array.push(data["address"]);
    arrayouter.push(array);
  }
  let sql = "INSERT INTO edetails  (name,email,phone,address) VALUES ? ";
  db.query(sql, [arrayouter], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("data added bulk ");
  });
}
// //add data to sql
// function addToTable(rowcount) {
//   //looping through and running sql individually

//   let display = displaydata();

//   if (rowcount == Object.keys(display).length) {
//     console.log("database in sync with file");
//   }
//   console.log(Object.keys(display).length);
//   for (let i = rowcount; i < Object.keys(display).length; i++) {
//     db.query(sql, display[i], (err, result) => {
//       if (err) {
//         throw err;
//       }
//       console.log(result);
//       console.log("data added");
//     });
//   }
// }
//bulk upload
function bulkUpload(rowcount) {
  let display = displaydata();

  let arrayouter = []; //store object in array
  let objLen = Object.keys(display).length;
  let objLendif = Math.abs(rowcount - Object.keys(display).length);
  if (objLendif > 100) {
    console.log("file  transaction too large :", objLen);

    console.log("file too large limiting transaction to :", 100);
  } else {
    console.log(" number of transactions :", objLen);
  }

  console.log("obj", objLen, "row", rowcount, "diff", objLendif);
  let count = 0;
  let hun = parseInt(rowcount) + 100;
  for (let i = rowcount; i < objLendif && i < hun; i++) {
    let array = [];

    array.push(display[i].name);
    array.push(display[i].email);
    array.push(display[i].phone);
    array.push(display[i].address);
    arrayouter.push(array);
  }

  //console.log(arrayouter);
  let sql = "INSERT INTO edetails  (name,email,phone,address) VALUES ?";
  db.query(sql, [arrayouter], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("data added bulk ");
  });
}
// // check if empty and perform action
// function checkIfEmpty() {
//   let sql = "SELECT EXISTS(SELECT * FROM edetails) as EX";
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     var results = Object.values(result[0]).toString();
//     if (results > 0) {
//       console.log(" add to table");
//       rownumber(); // to get the current sql index
//     } else {
//       console.log(" empty rows adding all");
//       insertAll();
//     }
//   });
// }

// count number of total rows
function rownumber() {
  let sql = "SELECT COUNT(*) AS rowcount FROM edetails ";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    let rowcount = Object.values(result[0]).toString();
    return bulkUpload(rowcount);
    //return addToTable(rowcount);
  });
}
// sql  pull all
function sqlPull() {
  let sql = "SELECT name,email,phone,address  FROM edetails  ";
  db.query(sql, (res, result) => {
    sqlJson(result);
  });
}
// json to excel
function sqlJson(results) {
  let sqlsheet = [];
  let data = {};
  // modify xml data
  for (let i = 0; i < results.length; i++) {
    data = {
      name: results[i].name,
      email: results[i].email,
      phone: results[i].phone,
      address: results[i].address,
    };
    sqlsheet.push(data);
  }

  //console.log("new", newdata);
  console.log(sqlsheet);

  let newWb = xlsx.utils.book_new(); //create workbook
  let worksheet = xlsx.utils.json_to_sheet(sqlsheet); //worsheet creat
  // append worksheet to workbook
  xlsx.utils.book_append_sheet(newWb, worksheet, "eDetails");

  //write data to excel
  xlsx.writeFile(newWb, "newdetails.xlsx");
  console.log("sql file update to excel");
}

module.exports = { rownumber, sqlPull };

//looping through and running sql individually
// for (let i = 0; i < Object.keys(display).length;; i++) {
//   db.query(sql, display[i], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     console.log("data added");
//   });
// }

// function addToTable(newdata) {
//   let sql = "INSERT INTO edetails  SET ? ";

//   db.query(sql, newdata, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     console.log("data added");
//   });
// }
