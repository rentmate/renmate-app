const { gql } = require( "apollo-server-express")
const typeDefs = gql`
  type Token { 
    _id: String
    token: String 
  }
  type User {
    _id: String
    username: String
    email: String
    password: String
    tokens: [Token]
  } 
  input postUser {
    username: String
    email: String
    password: String
  }
  input postToken { 
    _id: String
    token: String 
  }
  input postLogin {
    email: String
    password: String
  }
  type respLogin { 
    user: User,
    token: String
  }
  type Response {
    success: Boolean
  }
  type Query {
    me: User
    getUsers: [User]
  }
  type Mutation {
    addUser(user: postUser): Response
    login(login: postLogin): respLogin
    logout: Response 
  }
`
module.exports = typeDefs