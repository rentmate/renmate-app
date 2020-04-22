const {
  getUser,
  getUsers,
  addUser,
  authLogin
} = require('./services');


const resolver = {
  Query: {
    me:  async (_, {token}) => {
      let req = await getUser(token); 
      console.log(req)
      return req 
    },
    getUsers:(_) => getUsers(), 
  },
  Mutation: {
    addUser:  async (_, {user})  => { 
      req = await addUser(user)
      console.log(req)
      return req
    }, 
    login:  async (_, {login})  => { 
      req = await authLogin(login)
      console.log(req)
      return req
    }, 
  },
}

module.exports = resolver