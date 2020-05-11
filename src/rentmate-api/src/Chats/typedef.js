const { gql } = require( "apollo-server-express");
const typeDefs = gql`

type Message {
    ID: String!
    user1: String!
    user2: String!
    subject: String!
    content: String!
    date: String!
}
input MessageInput {
    user1: String!
    user2: String!
    subject: String!
    content: String!
    date: String!
}

type Chat {
    user : String!
    subject : String!
}

type Query {
    allMessages: [Message]!
    messageByReceptor(username: String!): [Message]!
    messageByUser(username: String!): [Message]!
    chatsByUser(username: String!): [Chat]!
    messageByChat(user1: String!, user2: String!, subject: String!): [Message]!
}
   

type Mutation {
    createMessage(message: MessageInput!): Message!
    deleteMessage(code: String!): String
}
`
module.exports = typeDefs;