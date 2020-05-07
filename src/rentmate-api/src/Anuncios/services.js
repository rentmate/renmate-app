const fetch = require('node-fetch');
const { ANUNCIOS_URL } = require( "./server")

const getAnuncios = async() => {
    const res = await fetch(ANUNCIOS_URL + '/anuncios')
    const json = res.json();
    console.log(res)
    return json;
}

const addAnuncio = async(anuncio) => {
    console.log(anuncio)
    const res = await fetch(ANUNCIOS_URL + '/anuncios',  { 
        method: 'POST', 
        body:    JSON.stringify(anuncio),
        headers: { 'Content-Type': 'application/json' } 
    } )
    const data = await res.json();
    return(data["anuncio"])
}

const deleteAnuncio = async (id) => {
    console.log(id)
    const res = await fetch(ANUNCIOS_URL + '/anuncios/' + id,  { 
        method: 'DELETE', 
    } )
    const data = await res.json();
    return(data["id"])
}

module.exports = {getAnuncios, addAnuncio, deleteAnuncio}