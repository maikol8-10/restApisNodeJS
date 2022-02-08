const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
//Cors permite que un cliente se conecte a un servidor para el intercambio de recursos
const cors = require('cors');

//Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})

//Crear el servidor

const app = express();

//Carpeta Publica
app.use(express.static('uploads'))

//Habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
//Opciones de CORS
const corsOptions = {

    origin: (origin, callback) => {
        //console.log(origin);
        //Revisar si la petición viene de un servidor que está en la whitelist
        const existe = whitelist.some(dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('NO permitido por CORS'));
        }
    }
}

//Hablilitar CORS
app.use(cors(corsOptions));

//Rutas de la App
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//Puerto  
//app.listen(5000);
app.listen(port, host, () => {
    console.log('El sevidor esta funcionando');
});