const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');

const UserController = require("./Controllers/MainController");
const server = require('http').createServer(app);


app.use(UserController);

app.use(express.json());
// app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.static('dist'));
server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${8080}!`));
module.exports = app;
