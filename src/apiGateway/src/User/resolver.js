const {
  getUsers,
  addUser,
  authLogin,
  authLogout
} = require('./services');


const resolver = {
  Query: {
    me:  async (_, {}, context) => {
      return context.user 
    },
    getUsers:(_) => getUsers(), 
  },
  Mutation: {
    addUser:  async (_, {user}, context)  => { 
      req = await addUser(user)
      console.log(req)
      return req
    }, 
    login:  async (_, {login}, context)  => { 
      req = await authLogin(login)
      console.log(req)
      return req
    }, 
    logout: async (_, {}, context)  => { 
      req = await authLogout(context)
      console.log(req)
      return req
    }, 
  },
}

module.exports = resolver