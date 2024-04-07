const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.static('static'));
app.use(express.urlencoded({extended: false}));


const PORT = 1330;
app.listen(PORT, ()=> {
    console.log('app is running at port=', PORT);
})