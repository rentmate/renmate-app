const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const typeDefs  = require ("./src/Chats/typedef");
const resolvers  = require ("./src/Chats/resolver");
const app = express();
//const { getUser} = require('./src/User/services');

app.use(bodyParser.json());
const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  formatError: error => {
    return error
  },
  /*context: async ({ req }) => {
    //console.log(req.headers)
    const token = req.headers.authorization || '';
    let user = await getUser(token);
    return {
      user,
      token
    }
  },*/
});
server.applyMiddleware({ app, path: "/graphql" });
var port = "3030";
app.set("port", port);
module.exports = app;