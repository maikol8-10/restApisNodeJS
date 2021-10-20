const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController')

module.exports = function () {

    //Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente)

    //Obtener todos los clientes via GET
    router.get('/clientes', clienteController.mostrarClientes)

    //Muestra un cliente en especifico (ID)
    router.get('/clientes/:idCliente', clienteController.mostrarCliente); 


    return router;
}