const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Cors permite que un cliente se conecte a un servidor para el intercambio de recursos
const cors = require('cors');

//Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
})

//Crear el servidor

const app = express();

//Habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Hablilitar CORS
app.use(cors());

//Rutas de la App
app.use('/', routes());

//Carpeta Publica
app.use(express.static('uploads'))

//Puerto  
app.listen(5000);