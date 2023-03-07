const express = require("express");
//const routesVersioning = require("express-routes-versioning")();

const router = express.Router();

router.use("/auth", require("./v1/auth"));

router.use("/user", require("./v1/user"));

module.exports = router;
