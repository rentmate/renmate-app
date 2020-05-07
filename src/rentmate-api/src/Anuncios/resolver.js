const {
  getAnuncios,
  addAnuncio,
  deleteAnuncio
} = require('./services');


const resolver = {
  Query: {
    getAnuncios:(_) => getAnuncios(), 
  },
  Mutation: {
    addAnuncio:  async (_, {anuncio})  => { 
      req = await addAnuncio(anuncio)
      console.log(req)
      return req
    }, 
    deleteAnuncio: async (_, { id }) => {
      req = await deleteAnuncio(id)
      console.log(req)
      return req
    },
  },
}

module.exports = resolver