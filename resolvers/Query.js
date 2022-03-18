exports.Query = {
  hello: () => {
    return "Hello world!";
  },
  numberOfAnimals: () => {
    return 55;
  },
  price: () => {
    return 1.5;
  },
  isCool: () => {
    return false;
  },
  // will return null
  list1: () => {
    ["item1", null, "item2"];
  },
  // will throw an error
  list2: () => {
    return ["item1", null, "item2"];
  },
  // when querying for this information we must specify the fields we want to query for
  products: (parent, { filter }, { db }) => {
    const { products, reviews } = db;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        return products.filter((product) => product.onSale);
      }
      if (avgRating) {
        const filteredProducts = products.filter((product) => {
          let sumRating = 0;
          let numOfReviews = 0;
          reviews.forEach((review) => {
            if (product.id === review.productId) {
              sumRating = sumRating + review.rating;
              numOfReviews++;
            }
          });
          productAvgRating = sumRating / numOfReviews;
          if (productAvgRating >= avgRating) {
            return product;
          }
        });
        return filteredProducts;
      }
    }

    return products;
  },
  // Every resolver receives 3 arguments: parent, args and context
  product: (parent, { id }, { db }) => {
    const { products } = db;
    // find method returns null if it doesn't find a match
    return products.find((product) => product.id === id);
  },
  categories: (parent, args, { db }) => {
    return db.categories;
  },
  category: (parent, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  },
};
