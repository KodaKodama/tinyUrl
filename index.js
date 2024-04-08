const express = require('express');
const db = require("./config/db");
const dotenv = require('dotenv').config();
const shortUrl = require('./routes/url');
const homeRoutes = require('./routes/home')
const app = express();

db();
//middlewares
app.use(express.json());
app.use(express.static('static'));
app.use(express.urlencoded({extended: false}));

app.use('/urlapi', shortUrl);
app.use('/', homeRoutes);
const PORT = 1335;
app.listen(PORT, ()=> {
    console.log('app is running at port=', PORT);
})