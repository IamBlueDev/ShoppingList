const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Nutrition{
  energyKj: Float
  energyKcal: Float
  fat: Float
  satFat: Float
  carbs: Float
  sugars: Float
  protine: Float
  salt: Float
  product: Product!
}

type Product{
  _id: ID!
  name: String!
  description: String!
  nut: Nutrition!
  photo: String
}



type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
  productList: [ListItem]
}

type AuthData{
  userId:ID!
  token: String!
  tokenExpiration:Int
  productList: [ListItem]
}
type ListItem{
  _id:ID!
  product:Product
  amount:Int
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}

input ProductInput {
  name: String!
  description: String!
}

input ProductNutInput {
  energyKcal: Float!
  fat: Float!
  satFat: Float!
  carbs: Float!
  sugars: Float!
  protine: Float!
  salt: Float!
  energyKj: Float
}
input UserInput {
  email: String!
  password: String!
}


type RootQuery {
    events: [Event!]!
    login(email:String!,password:String!):AuthData!
    products: [Product!]!
    getProducts(userId:String!):[Product!]!
    getSocialProducts(socialId: String!): [ListItem]
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createProduct(productInput: ProductInput, nutInput:ProductNutInput, photo:String): Product!
    addProductToUser(product:String,amount:Int): User
  }


schema {
    query: RootQuery
    mutation: RootMutation
}
`);
