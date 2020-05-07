const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
var usersRouter = require('./routes/user.js');
const bodyParser = require('body-parser');

//settings
var port = "3000"
app.set("port", port);
app.listen()

//midleware
app.use(cors());
//app.use(express.json());


var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoded' })

app.use(jsonParser);
app.use(urlencodedParser);
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);


module.exports = app;