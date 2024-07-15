const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/tovary", require("./tovar"));
router.use("/categor", require("./categor"));
router.use("/admin", require("./admin"));

module.exports = router;
