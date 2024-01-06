// routes form controllers for data
const express = require("express");
const router = new express.Router();

const {
  getData,
  getFilteredData,
  insertData,
  getUniqueValues,
} = require("../controllers/dataControllers");

router.get("/", getData);
router.get("/filter", getFilteredData);
router.post("/insert", insertData);
router.get("/unique", getUniqueValues);

module.exports = router;
