
var ldap = require('ldapjs');
var client = ldap.createClient({ url: "ldap://172.26.0.1" });
const assert = require('assert').strict;



const login_ldap = async (req,res,next) => {
  try {

    user = "cn="+req.body.email+",ou=users,dc=rentmate,dc=co"

    await client.bind(user,req.body.password,function(error){
      if (error){
        console.log(error)
        res.status(401).send({error:'Failed auth in ldap, Invalid user or password'})
      }
      next()
    });
    
  } catch (error) {
      console.log(error)
      res.status(401).send({error:'Error Ldap!'})
  }
}

module.exports = login_ldap