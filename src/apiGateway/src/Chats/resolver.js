const { allMessages, addMessages, delMessage } = require('./services');


const resolver = {
	Query: {
		messageByReceptor: async (_, {username}) => {
			let req = await allMessages();
			console.log(req);
			let messages = req.filter( message =>	message.user2 == username);
			return messages;
		},
		messageByUser: async (_, {username}) => {
			let req = await allMessages();
			console.log(req);
			let messages = req.filter( message =>	(message.user1 == username) || (message.user2 == username));
			return messages;
		},
		messageByChat: async(_, {user1, user2, subject}) => {
			let req = await allMessages();
			let messages = req.filter ( message => (message.user1 == user1 || message.user2 == user1) && (message.user1 == user2 || message.user2 == user2) && (message.subject == subject));
			return messages;
		},
		chatsByUser: async(_, {username}) => {
			let req = await allMessages();
			let messages = req.filter ( message => (message.user1 == username || message.user2 == username));
			let chats = [];
			for(let i = 0; i< messages.length; i++){
				let chat = { user: ((messages[i].user1 != username)? messages[i].user1 : messages[i].user2), subject: messages[i].subject};
				chats.push(chat);
			}
			return Array.from(new Set(chats.map( JSON.stringify ) )).map( JSON.parse );
		},

		allMessages:(_) => allMessages(), 
	},


	Mutation: {
		createMessage: async (_, { message }) => {
			let req = await addMessages(message);
      		return req
		},
		deleteMessage: async (_, {id}) => {
			let req = await delMessage(message)	;
      		return req
		}
	}
};

module.exports = resolver;