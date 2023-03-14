const express = require("express");

const controller = require("../../../app/controller/withdraw");
const isAuth = require("../../../middleware/isAuth");
const router = express.Router();

router.use(isAuth);

router.get("/listing", controller.getAllWithdraw);

router.post("/add", controller.addWithdraw);
router.put("/edit/:withdrawId", controller.editWithdraw);
router.delete("/delete/:withdrawId", controller.deleteWithdraw);

router.get("/show/:withdrawId", controller.getWithdrawDetails);

module.exports = router;
