const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    },
}

//Pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

//Agrega nuevos productos

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({ mensaje: 'Se agregó un nuevo producto' });
    } catch (error) {
        console.log(error);
    }
}

//Muestra todos los productos

exports.mostrarProductos = async (req, res, next) => {
    try {
        //Obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
    }
}

//Muestra producto por su ID
exports.mostrarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto);
        if (!producto) {
            res.json({ mensaje: 'Ese producto no existe' });
            next();
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
    }
}

//Actualizar producto por su ID
exports.actualizarProducto = async (req, res, next) => {
    try {
        let productoAnterior = await Productos.findById(req.params.idProducto);
        // Construir producto
        let nuevoProducto = req.body;
        //Verificar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            nuevoProducto.imagen = productoAnterior.imagen;
        }
        let producto = await Productos.findOneAndUpdate({ _id: req.params.idProducto },
            nuevoProducto, {
            new: true
        });
        console.log(producto)
        res.json(producto);
    } catch (error) {
        //Si hay error, console.log y next 
        console.log(error);
        next();
    }
}


//Eliminar producto por su ID

exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete({ _id: req.params.idProducto });
        res.json({ mensaje: 'El producto se ha eliminado' });
    } catch (error) {
        //Si hay error, console.log y next 
        console.log(error);
        next();
    }
}