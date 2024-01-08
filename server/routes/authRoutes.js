const express = require("express");
const router = new express.Router();

const {signup, login} = require("../controllers/authentication")

router.post("/login", login);

//this signup function used to create a admin if there is no admin in the database
router.post("/signup", signup);

module.exports = router;
