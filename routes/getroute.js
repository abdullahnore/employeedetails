const express = require("express");
const {
  convertJsonToExcel,
  displaydata,
  getParams,
  sortData,
} = require("../file.js");
const { rownumber, sqlPull } = require("../sql");
const router = express.Router();
const path = require("path");
const url = require("url");
const app = express();

//home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../form.html"));
});

//add data to excel
router.post("/submit", (req, res) => {
  res.send(req.body);
  let str = JSON.parse(JSON.stringify(req.body));
  console.log(str);
  convertJsonToExcel(str);
});

//display data
router.get("/display", (req, res) => {
  let display = [];
  display = displaydata();
  res.render(path.join(__dirname, "../display"), {
    displayd: display,
  });
  //res.json(displaydata());
  //res.sendFile(path.join(__dirname, "../display.html"));
});
router.get("/display_data", (req, res) => {
  let s = url.parse(req.url, true);

  s = new URLSearchParams(s.search);
  let data = getParams(s);
  let displaysort = sortData(data);
  console.log(displaysort);
  res.status(200).send({
    display: displaysort,
  });
});
router.get("/upload", (req, res) => {
  rownumber();
  res.status(200);
});
router.get("/download", (req, res) => {
  sqlPull();
  res.status(200);
});

module.exports = router;
