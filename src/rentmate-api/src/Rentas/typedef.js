const { gql } = require( "apollo-server-express");
const typeDefs = gql`

type Rent {
    id: Int
    owner: String
	client: String
    idAdvertisement: String
    startDate:String
    endDate:String
}

input RentInput {
    owner: String
    client: String
    idAdvertisement: String
    startDate:String
    endDate:String
}


type Query {
    allRents: [Rent]!
   }
   

type Mutation {
    createRent(rent: RentInput!): Rent!
    deleteRent(code: String!): String
}
`
module.exports = typeDefs;