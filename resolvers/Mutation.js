const { v4: uuid } = require("uuid");
const { categories } = require("../db");

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = { id: uuid(), name };

    db.categories.push(newCategory);

    return newCategory;
  },

  addProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, price, image, onSale, categoryId } =
      input;
    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    };
    db.products.push(newProduct);
    return newProduct;
  },

  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = input;

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };

    db.reviews.push(newReview);
    return newReview;
  },
  // deteles category but not its products, this is posible because in Product's schema the field "category" is nullable
  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id) {
        return { ...product, categoryId: null };
      } else {
        return product;
      }
    });
    return true;
  },
  // deletes the product and its reviews
  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((product) => {
      product.id !== id;
    });
    db.reviews = db.reviews.filter((review) => {
      reviews.productId !== id;
    });
    return true;
  },

  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },

  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);
    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };
    return db.categories[index];
  },

  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((category) => category.id === id);
    //if findIndex doesn't find a match it returns -1
    if (index === -1) return null;

    db.products[index] = {
      ...db.products[index],
      ...input,
    };
    return db.products[index];
  },

  updateReview: (parent, { id, input }, { db }) => {
    const index = db.review.findIndex((category) => category.id === id);
    if (index === -1) return null;
    db.review[index] = {
      ...db.review[index],
      ...input,
    };
    return db.review[index];
  },
};
