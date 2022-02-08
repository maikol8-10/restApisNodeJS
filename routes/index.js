const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

const usuariosController = require('../controllers/usuariosController');

/**Middleware para proteger las rutas */
const auth = require('../middleware/auth');

module.exports = function () {

    /**CLIENTES */

    //Agrega nuevos clientes via POST
    router.post('/clientes', auth, clienteController.nuevoCliente)

    //Obtener todos los clientes via GET
    router.get('/clientes', auth, clienteController.mostrarClientes)

    //Muestra un cliente en especifico (ID)
    router.get('/clientes/:idCliente', auth, clienteController.mostrarCliente);

    //Actualizar cliente
    router.put('/clientes/:idCliente', auth, clienteController.actualizarCliente);

    //Eliminar cliente
    router.delete('/clientes/:idCliente', auth, clienteController.eliminarCliente);

    /**PRODUCTOS */

    //Agregar nuevos productos
    router.post('/productos', auth, productosController.subirArchivo, productosController.nuevoProducto);

    //Muestra todos los productos
    router.get('/productos', auth, productosController.mostrarProductos)

    //Muestra producto por ID
    router.get('/productos/:idProducto', auth, productosController.mostrarProducto);

    //Actualizar producto
    router.put('/productos/:idProducto', auth, productosController.subirArchivo, productosController.actualizarProducto);

    //Eliminar producto
    router.delete('/productos/:idProducto', auth, productosController.eliminarProducto);

    //Busqueda de productos
    router.post('/productos/busqueda/:query', auth, productosController.buscarProducto);

    /**PEDIDOS */

    //Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', auth, pedidosController.nuevoPedido);

    //Mostrar todos los pedidos
    router.get('/pedidos', auth, pedidosController.mostrarPedidos);

    //Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido', auth, pedidosController.mostrarPedido);

    //Actualizar pedidos
    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido);

    //Eliminar un pedido
    router.delete('/pedidos/:idPedido', auth, pedidosController.eliminarPedido);


    /**Usuarios */
    router.post('/crear-cuenta', auth, usuariosController.registrarUsuarios);

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);


    return router;
}