const xlsx = require("xlsx");
const fs = require("fs");
const customsort = require("./sort");
let checkemail = (data, sheetDetails) => {
  for (let checkemail of sheetDetails) {
    if (checkemail.email == data.email) {
      throw console.log("email.exists");
    }
  }
};
function isEmpty(data) {
  if (
    Object.values(data.name.split(" ")) == "" ||
    Object.values(data.email.split(" ")) == ""
  ) {
    throw console.log(" name and email should not be empty");
  }
}

const displaydata = () => {
  const workbookADD = xlsx.readFile("./newdetails.xlsx"); //read excel file
  // read sheet from work book
  let wbdata = workbookADD.Sheets["eDetails"];
  //convert to json
  let sheetDetails = xlsx.utils.sheet_to_json(wbdata);

  //sheetDetails = JSON.stringify(sheetDetails);
  console.log("sheetDetails");
  return sheetDetails;
};
const convertExcelToJson = (data) => {
  console.log("fileExist");
  const workbookADD = xlsx.readFile("./newdetails.xlsx"); //read excel file
  // read sheet from work book
  let wbdata = workbookADD.Sheets["eDetails"];
  //convert to json
  const sheetDetails = xlsx.utils.sheet_to_json(wbdata);

  //check if data empty
  isEmpty(data);

  //check if email exist
  checkemail(data, sheetDetails);

  // modify xml data
  let newdata = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
  };
  //console.log("new", newdata);
  sheetDetails.push(newdata);
  //console.log("new", sheetDetails);

  xlsx.utils.sheet_add_json(wbdata, sheetDetails);
  //write data to excel
  xlsx.writeFile(workbookADD, "newdetails.xlsx");
  console.log("sheet updated");
};
// main callback
const convertJsonToExcel = (data) => {
  if (!fs.existsSync("./newdetails.xlsx")) {
    console.log("NEW FILE");
    let newWb = xlsx.utils.book_new(); //create workbook
    let worksheet = xlsx.utils.json_to_sheet([data]); //worsheet creat
    // append worksheet to workbook
    xlsx.utils.book_append_sheet(newWb, worksheet, "eDetails");

    //write data to excel
    xlsx.writeFile(newWb, "newdetails.xlsx");
  } else if (fs.existsSync("./newdetails.xlsx")) {
    convertExcelToJson(data);
  }
};
function getParams(s) {
  for (let data of s.values()) {
    return data;
  }
}
//sort data
function sortData(data) {
  let sheetDetails = displaydata();
  sheetDetails = sheetDetails.sort(customsort(data));
  return sheetDetails;
}

module.exports = {
  convertJsonToExcel,
  displaydata,
  getParams,
  sortData,
  convertExcelToJson,
};
