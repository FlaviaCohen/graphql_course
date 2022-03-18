// As the array of products is not in the category's query a special resolver is needed for Category
exports.Category = {
  // destructured id from parent
  // in case renameing is needed it can be destructured like {id: categoryId} and now the variable id is stored in categoryId
  products: ({ id }, { filter }, { db }) => {
    const { products } = db;
    if (filter && filter.onSale) {
      return products.filter((product) => {
        return product.onSale;
      });
    }

    return products.filter((product) => product.categoryId === id);
  },
};
