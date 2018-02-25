const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); //to use differenct domain name, CORS Module
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const categoryRouter = require('./routes/category');
const users= require('./routes/users');

mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected',()=>{
     console.log('Connected to databse ' + config.database);
})

const app=express(config.database);
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

//passoport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.get('/', (req, res, next)=>{
     res.send('invalid endpoint');
});

app.get('/test', function(req,res,next){
     res.send('test');
});

app.use('/users',users);
//app.use('/category', categoryRouter);
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
//heroku port: process.env.PORT || 8080
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
     console.log('server started on port' + port);
});