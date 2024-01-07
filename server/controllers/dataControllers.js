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

// Controller to get all data with total page number
const getData = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = await Data.countDocuments();

    const totalPages = Math.ceil(totalCount / limit);

    const data = await Data.find().limit(limit).skip(startIndex);
    res.json({
      data,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller to get filtered data
const getFilteredData = async (req, res) => {
  try {
    const filters = req.query;
    console.log(filters);
    const data = await Data.find(filters);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//controller to get unique values for filters
const getUniqueValues = async (req, res) => {
  try {
    const uniqueValues = {};
    const fields = [
      "end_year",
      "intensity",
      "sector",
      "insight",
      "region",
      "start_year",
      "published",
      "country",
      "relevance",
      "pestle",
      "source",
      "topic",
    ];

    for (const field of fields) {
      const distinctValues = await Data.distinct(field);
      uniqueValues[field] = distinctValues;
    }

    res.json(uniqueValues);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//controller to get labels and data for intensity bar chart
const getBarChartData = async (req, res) => {
  try {
    let totalDocuments = await Data.countDocuments();
    const aggregationResult = await Data.aggregate([
      {
        $group: {
          _id: "$intensity",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          labels: { $push: "$_id" },
          data: { $push: "$count" },
        },
      },
    ]);
    
    const labels = aggregationResult[0].labels;
    const data = aggregationResult[0].data;
    
    res.json({ labels, data, totalDocuments });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  getFilteredData,
  insertData,
  getData,
  getUniqueValues,
  getBarChartData,
};
