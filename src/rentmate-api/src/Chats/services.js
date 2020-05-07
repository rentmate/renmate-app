const fetch = require('node-fetch');
const { Chats_url} = require( "./server")


const allMessages = async()=>{
    const res = await fetch(Chats_url + '/rentmate-chats-ms')
    const json = res.json();
    console.log(res);
    return json;
};


const addMessages = async(message) => {
    const res = await fetch(Chats_url+ '/rentmate-chats-ms',  { 
        method: 'POST', 
        body:    JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' } 
    } );
    const data = await res.json();
    return(data)
};


const delMessage = async(id)=>{
    const res = await fetch(Chats_url + '/rentmate-chats-ms/' + id)
    const json = res.json();
    console.log(res);
    return json;
};

module.exports = {allMessages, addMessages, delMessage};