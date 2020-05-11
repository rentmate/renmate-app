const { allRents, addRent, delRent } = require('./services');


const resolver = {
	Query: {
		allRents:(_) => allRents(),
	},


	Mutation: {
		createRent: async (_, { rent }) => {
			let req = await addRent(rent);
      		return req
		},
		deleteRent: async (_, {id}) => {
			let req = await delRent(id);
      		return req
		}
	}
};

module.exports = resolver;