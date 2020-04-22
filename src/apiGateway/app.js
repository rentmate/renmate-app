const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express")
const typeDefs  = require ("./src/User/typedef")
const resolvers  = require ("./src/User/resolver")
const app = express()
app.use(bodyParser.json())
const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  formatError: error => {
    return error
  },
  context: ({ req, res }) => {
    return {
      req,
      res,
    }
  },
})
server.applyMiddleware({ app, path: "/graphql" })
var port = "3030"
app.set("port", port);
module.exports = app;