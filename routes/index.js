const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = function () {

    /**CLIENTES */

    //Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente)

    //Obtener todos los clientes via GET
    router.get('/clientes', clienteController.mostrarClientes)

    //Muestra un cliente en especifico (ID)
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    //Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //Eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /**PRODUCTOS */

    //Agregar nuevos productos
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);

    //Muestra todos los productos
    router.get('/productos', productosController.mostrarProductos)

    //Muestra producto por ID
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    //Actualizar producto
    router.put('/productos/:idProducto', productosController.actualizarProducto);

    //Eliminar producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto);


    /**PEDIDOS */

    //Agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido);

    //Mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    //Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    //Actualizar pedidos
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    //Eliminar un pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);


    return router;
}