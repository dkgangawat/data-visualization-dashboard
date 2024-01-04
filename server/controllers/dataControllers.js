const Data = require("../models/dataSchema");
const jsondata = require("../models/jsondata.json");

//controller to insert json data into mongodb
const insertData = async (req, res) => {
  try {
    const data = req.body;
    const isDataBaseEmpty = (await Data.find().countDocuments()) === 0;
    if (isDataBaseEmpty) {
      await Data.insertMany(jsondata);
      res.json({ message: "Data inserted successfully" });
    } else {
      res.json({ message: "Data already inserted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller to get all data
const getData = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const data = await Data.find().limit(limit).skip(startIndex);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller to get filtered data
const getFilteredData = async (req, res) => {
  try {
    const filters = req.query;
    const data = await Data.find(filters);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getFilteredData, insertData, getData };
