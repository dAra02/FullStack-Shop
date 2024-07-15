const express = require("express");
const { getTovarAdmin } = require("../controllers/tovar");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const authentificated = require("../middlewares/authentificated");
const mapTovar = require("../helpers/mapTovar");

const router = express.Router({ mergeParams: true });

router.get("/", authentificated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const tovary = await getTovarAdmin();

  res.send({ data: tovary.map(mapTovar) });
});

module.exports = router;
