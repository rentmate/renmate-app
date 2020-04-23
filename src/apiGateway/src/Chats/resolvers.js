import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allMessages: (_) =>
			generalRequest(URL,'GET'),
		messageByReceptor: (_, {username}) => 
			generalRequest(URL,'GET').then((messResponse) => {
				let messages = messResponse.filter( message =>	message.user2 == username)
				return messages;
			}),
		messageByUser: (_, {username}) => 
		generalRequest(URL,'GET').then((messResponse) => {
			let messages = messResponse.filter( message =>	(message.user1 == username) || (message.user2 == username))
			return messages;
		}),
	},
	Mutation: {
		createMessage: (_, { message }) =>
			generalRequest(`${URL}`, 'POST', message),
		deleteMessage: (_, { code }) =>
			generalRequest(`${URL}/${code}`, 'DELETE')
	}
};

export default resolvers;
