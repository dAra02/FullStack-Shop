const express = require("express");
const {
  addTovar,
  editTovar,
  deleteTovar,
  getTovary,
  getTovar,
} = require("../controllers/tovar");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const mapTovar = require("../helpers/mapTovar");
const authentificated = require("../middlewares/authentificated");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { tovar, lastPage } = await getTovary(
    req.query.search,
    req.query.limit,
    req.query.page,
    req.query.sortField,
    req.query.sortOrder,
    req.query.categor
  );
  res.send({ data: { lastPage, tovar: tovar.map(mapTovar) } });
});

router.get("/:id", async (req, res) => {
  const tovar = await getTovar(req.params.id);

  res.send({ data: mapTovar(tovar) });
});

router.post("/", authentificated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const newTovar = await addTovar({
      title: req.body.title,
      image: req.body.imageUrl,
      categor: req.body.categor,
      price: req.body.price,
      content: req.body.content,
    });
    res.send({ data: mapTovar(newTovar) });
  } catch (e) {
    res.send({
      error: "Не удалось создать товар" || "Неизвестная ошибка",
    });
  }
});

router.patch(
  "/:id",
  authentificated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updateTovar = await editTovar(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      categor: req.body.categor,
      price: req.body.price,
      image: req.body.imageUrl,
    });

    res.send({ data: mapTovar(updateTovar) });
  }
);

router.delete(
  "/:id",
  authentificated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteTovar(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
