const { gql } = require( "apollo-server-express")
const typeDefs = gql`
  type Anuncio {
    idAnuncio: Int
    name: String
    description: String
    photo: String
    price: String
    idOwner: Int
  } 
  input postAnuncio {
    name: String
    description: String
    photo: String
    price: String
    idOwner: Int
  }
  type Response {
    success: Boolean
  }
  type Query {
    getAnuncios: [Anuncio]
    getAnuncioById(id: Int): [Anuncio]
  }
  type Mutation {
    addAnuncio(anuncio: postAnuncio): Anuncio
    deleteAnuncio(id: Int): Int
  }
`
module.exports = typeDefs