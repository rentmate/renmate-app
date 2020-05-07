const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express")
const app = express()
const { getUser} = require('./src/User/services');

const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
//import all typedefs
const userType  = require ("./src/User/typedef")
const chatsType  = require ("./src/Chats/typedef")
// import all resolvers
const userResolver  = require ("./src/User/resolver")
const chatsResolver  = require ("./src/Chats/resolver")


// Merge Typedefinitions
const types = [
  userType,
  chatsType,
];

let typeDefs = mergeTypes(types, { all: true });


// Merger Resolvers 
const resolvers_concat = [
  userResolver,
  chatsResolver,
];

let resolvers = mergeResolvers(resolvers_concat);



app.use(bodyParser.json())
const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  formatError: error => {
    return error
  },
  context: async ({ req }) => {
    //console.log(req.headers)
    const token = req.headers.authorization || '';
    let user = await getUser(token);
    return {
      user,
      token
    }
  },
})
server.applyMiddleware({ app, path: "/graphql" })
var port = "3030"
app.set("port", port);
module.exports = app;