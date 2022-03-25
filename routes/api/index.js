const express = require("express");

let router = express.Router();
const v1Router = require("../api/v1/index");


router.use("/v1", v1Router);

module.exports = router;