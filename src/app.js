const express = require('express');
const session = require('express-session');
const morgan  = require('morgan');

const config     = require('./config/config');
const api_routes = require('./ports/http/index');
require('./config/dependency-injection');


const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Configurar express-session
app.use(session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.get('/',(req,res)=>{
    return res.status(200).json({
        mensaje:     'Bienvenido a la API REST ',
        name:        'Desafío',
        description: 'Desafío',
        version:     '0.0.1'
    });
});

app.use('/api',api_routes);

module.exports = app;
