
var ldap = require('ldapjs');
var client = ldap.createClient({ url: "ldap://172.26.0.1" });
const assert = require('assert').strict;

var user = "cn=admin,dc=rentmate,dc=co"
var pass = "admin"


const register_ldap = async (req,res,next) => {
  try {

    var newDN = "cn="+req.body.email+",ou=users,dc=rentmate,dc=co";
    var newUser = {
      sn: req.body.username,
      uid: req.body.username,
      userPassword: req.body.password,
      objectClass: 'inetOrgPerson'
    };
    await client.bind(user,pass,function(err){
      assert.ifError(err);
      client.add(newDN, newUser, next);
    });
    
    next()
  } catch (error) {
      console.log(error)
      res.status(401).send({error:'Error Ldap!'})
  }
}

module.exports = register_ldap