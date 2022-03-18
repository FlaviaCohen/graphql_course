const { gql } = require("apollo-server");

// Query/Schema = the way that data is going to be fetched
// Scalar types = String, Int, Float, Boolean, ID! (this is a specific scalar type that behaves like String! but for ids)
// Names of schema's properties and resolvers have to match!
// When scalar types are specified this way the resolver can return these or null unless ! is added. In that case de value will be not nullable
exports.typeDefs = gql`
  type Query {
    hello: String
    numberOfAnimals: Int
    price: Float
    isCool: Boolean
    list1: [String]
    list2: [String!]
    """
    to query for array of products
    """
    products(filter: ProductsFilterInput): [Product!]
    """
    to query for specific product by id
    """
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: addCategoryInput!): Category!
    addProduct(input: addProductInput!): Product!
    addReview(input: addReviewInput): Review!
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateCategory(id: ID!, input: updateCategoryInput): Category
    updateProduct(id: ID!, input: updateProductInput): Product
    updateReview(id: ID!, input: updateReviewInput): Review
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    image: String!
    onSale: Boolean!
    categoryId: ID!
    category: Category
    reviews: [Review]
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input addCategoryInput {
    name: String!
  }

  input addProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    categoryId: ID!
  }

  input addReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input updateCategoryInput {
    name: String!
  }

  input updateProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    categoryId: ID!
  }

  input updateReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
`;
// list1 will return null if there's any null value in the array

// In the Review type it's not necessary to declare a productId as foreign key because we are never calling a product from a review, it'll be always the other way arround

// When params are objects we must define and pass an input (and make it nullable in order to pass this filter only when it's necessary)
