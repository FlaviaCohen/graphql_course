exports.Product = {
  // distructured categoryId from parent and categories from context
  category: ({ categoryId }, args, { db }) => {
    return db.categories.find((category) => category.id === categoryId);
  },
  // review.productId comes from db.js, not from the schema
  reviews: ({ id }, args, { db }) => {
    return db.reviews.filter((review) => review.productId === id);
  },
};
