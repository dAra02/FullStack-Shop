const Tovar = require("../models/Tovar");
const Categor = require("../constants/categor");

// add
async function addTovar(tovar) {
  return await Tovar.create(tovar);
}

// edit
async function editTovar(id, tovar) {
  const newTovar = await Tovar.findByIdAndUpdate(id, tovar, {
    returnDocument: "after",
  });

  return newTovar;
}

// delete
async function deleteTovar(id) {
  return await Tovar.deleteOne({ _id: id });
}

// получение списка с пагинацией , поиском, сортировкой, фильтрацией
async function getTovary(
  search = "",
  limit = "10",
  page = 1,
  sortField = "price",
  sortOrder,
  categor
) {
  let query = { title: { $regex: search, $options: "i" } };
  if (categor !== undefined) {
    query.categor = categor;
  }

  const sortOptions = {};
  if (sortField) {
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
  }

  const [tovar, count] = await Promise.all([
    Tovar.find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip((page - 1) * limit),
    Tovar.countDocuments(query),
  ]);

  return {
    tovar,
    lastPage: count > limit ? Math.ceil(count / limit) : 1,
  };
}

// получение одного товара

async function getTovar(id) {
  return await Tovar.findById(id);
}

async function getTovarAdmin() {
  return await Tovar.find();
}

function getCategor() {
  return [
    { id: Categor.Full, name: "Все" },
    { id: Categor.VideoCard, name: "Видеокарта" },
    { id: Categor.Processor, name: "Процессор" },
    { id: Categor.Materinsc, name: "Материнские платы" },
    { id: Categor.BlockPitani, name: "Блоки питания" },
    { id: Categor.OpetarivnaiPamit, name: "Оперативная память" },
  ];
}

module.exports = {
  addTovar,
  editTovar,
  deleteTovar,
  getTovary,
  getTovar,
  getCategor,
  getTovarAdmin,
};
