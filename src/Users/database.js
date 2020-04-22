const mongoose = require("mongoose");

mongoose.Promise = Promise;
var url = 'mongodb://mongo:27017/rentmate';
var connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to Rentmate DataBase Hola');
}, (err) => {
    console.log(err);
});