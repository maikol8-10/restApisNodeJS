const Clientes = require('../models/clientes');

//Agrega un nuevo cliente

exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);
    try {
        //Almacenar registros
        await cliente.save();
        res.json({ mensaje: 'Se agregó un nuevo cliente' });
    } catch (error) {
        //Si hay error, console.log y next 
        console.log(error);
        next();
    }
}

exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        //Si hay error, console.log y next 
        console.log(error);
        next();
    }
}

//Muestra un cliente por ID
exports.mostrarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        if(!cliente){
            res.json({mensaje:'Ese cliente no existe'});
            next();
        }
        res.json(cliente);
    } catch (error) {
        //Si hay error, console.log y next 
        console.log(error);
        next();
    }
}