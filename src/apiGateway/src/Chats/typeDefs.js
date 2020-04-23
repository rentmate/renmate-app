export const messagesTypeDef = `
type Message {
    ID: String!
    user1: String!
    user2: String!
    subject: String!
    content: String!
}
input MessageInput {
    user1: String!
    user2: String!
    subject: String!
    content: String!
}`;

export const messagesQueries = `
    allMessages: [Message]!
    messageByReceptor(username: String!): [Message]!
    messageByUser(username: String!): [Message]!
`;
    //courseByCode(code: Int!): Course!

export const messagesMutations = `
    createMessage(message: MessageInput!): Message!
    deleteMessage(code: String!): String
    
`;
    //updateCourse(code: Int!, course: CourseInput!): Course!