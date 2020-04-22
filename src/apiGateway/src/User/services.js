const fetch = require('node-fetch');
const { USER_URL, AUTH_URL } = require( "./server")

const getUser = async(token) => {
    const res = await fetch(USER_URL + '/users/me', { 
        headers: { 'authorization': token }  
    });
    const data = await res.json();
    console.log(data)
    return(data)
}

const getUsers = async() => {
    const res = await fetch(USER_URL + '/users/getUsers')
    const json = res.json();
    console.log(res)
    return json;
}

const addUser = async(user) => {
    console.log(user)
    const res = await fetch(USER_URL + '/users/',  { 
        method: 'POST', 
        body:    JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' } 
    } )
    const data = await res.json();
    return(data["user"])
}


const authLogin = async(user) => {
    console.log(user)
    const res = await fetch(AUTH_URL + '/auth/login',  { 
        method: 'POST', 
        body:    JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' } 
    } )
    const data = await res.json();
    return(data["token"])
}

module.exports = {getUser, getUsers, addUser, authLogin}