const express = require("express");
const { getCategor } = require("../controllers/tovar");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const categor = getCategor();

  res.send({ data: categor });
});
module.exports = router;
