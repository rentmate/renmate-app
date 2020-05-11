const fetch = require('node-fetch');
const { Rentas_url} = require( "./server");


const allRents = async()=>{
    const res = await fetch(Rentas_url + '/api/rents');
    const json = await res.json();
    console.log("ALL RENTS: "+JSON.stringify(json)+" "+json);
    return json.data;
};


const addRent = async(rent) => {
    const res = await fetch(Rentas_url+ '/api/rents',  {
        method: 'POST', 
        body:    JSON.stringify(rent),
        headers: { 'Content-Type': 'application/json' } 
    } );
    const data = await res.json();
    console.log(data);
    return data.data;
};


const delRent = async(id)=>{
    const res = await fetch(Rentas_url + '/api/rents' + id);
    const json = await res.json();
    console.log(res);
    return json.data;
};

module.exports = {allRents, addRent, delRent};