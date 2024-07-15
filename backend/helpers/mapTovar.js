module.exports = function (tovar) {
  return {
    id: tovar.id,
    title: tovar.title,
    imageUrl: tovar.image,
    categorId: tovar.categor,
    price: tovar.price,
    content: tovar.content,
  };
};
