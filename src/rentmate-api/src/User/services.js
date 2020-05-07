const fetch = require('node-fetch');
const { USER_URL, AUTH_URL } = require( "./server")

const getUser = async(token) => {
    if (token == '') {
        return ( "Please login" )
    }
    const res = await fetch(AUTH_URL + '/auth/me', { 
        headers: { 'authorization': token }  
    });
    const data = await res.json();
    //console.log(data)
    //if (!data["user"])  {
    //    throw new Error(data["error"])
    //}
    return(data["user"])
}

const getUsers = async() => {
    const res = await fetch(USER_URL + '/users/getUsers')
    const data = await res.json();
    console.log(data)
    if (!data["users"])  {
        throw new Error(data["error"])
    }
    return(data["users"])
}

const addUser = async(postUser) => {
    console.log(postUser)
    const res = await fetch(USER_URL + '/users/',  { 
        method: 'POST', 
        body:    JSON.stringify(postUser),
        headers: { 'Content-Type': 'application/json' } 
    } )
    const data = await res.json();
    if (!data["success"])  {
        throw new Error(data["error"])
    }
    return(data)
}

const authLogin = async(postLogin) => {
    console.log(postLogin)
    const res = await fetch(AUTH_URL + '/auth/login',  { 
        method: 'POST', 
        body:    JSON.stringify(postLogin),
        headers: { 'Content-Type': 'application/json' } 
    } )
    const data = await res.json();
    if (!data["user"])  {
        throw new Error(data["error"])
    }
    return(data)
}

const authLogout = async(context) => {
    console.log(context)
    const res = await fetch(AUTH_URL + '/auth/logout',  { 
        method: 'POST', 
        body:    JSON.stringify(context),
        headers: { 'Content-Type': 'application/json' } 
    } )
    const data = await res.json();
    if (!data["success"])  {
        throw new Error(data["error"])
    }
    return(data)
}

module.exports = {getUser, getUsers, addUser, authLogin, authLogout}