const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/data", require("./routes/dataRoute"));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
