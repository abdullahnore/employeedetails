const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const express = require("express");
const PORT = 5000;
const app = express();
//app.use(urlencoded({ extended: false })); // decode form data
app.use(express.json());
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
//app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use("/", require("./routes/getroute"));

app.listen(PORT, () => {
  console.log("server started at port", PORT);
});
