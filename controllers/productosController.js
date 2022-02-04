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
    console.log(req.body);
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



        let metakeys = [{
            name: 'name',
            label: 'Nombre'
        },
        {
            name: 'identification',
            label: 'ID'
        },
        {
            name: 'country',
            label: 'Pais'
        },
        {
            name: 'dataFrom',
            label: 'Fuente'
        },
        {
            name: 'url_source',
            label: 'Url'
        }
        ];

        let arrayData = [{
            country: "Panama",
            dataFrom: "Sayari",
            direction: "CL 18 N   5   62 ZN INDUSTRIAL",
            entity_type: "company",
            id: "L_VE7w7rvmLBt7XmnDafyg",
            identification: "L_VE7w7rvmLBt7XmnDafyg",
            name: "GRUPO NOVA S.A.",
            sourceId: 45,
            url_source: "https://sayari.com/",
        },
        {
            country: "Panama",
            dataFrom: "Sayari",
            direction: "AVE RICARDO J ALFARO ED THE CENTURY TOWE",
            entity_type: "company",
            id: "t-E7OY7V0oAu1JIcO1BDQA",
            identification: "t-E7OY7V0oAu1JIcO1BDQA",
            name: "GRUPO POWER METAL, S.A.",
            sourceId: 45,
            url_source: "https://sayari.com/",
        }, {
            country: "Panama",
            dataFrom: "Sayari",
            direction: "BELLAVISTA CALLE 38 Y AVE PERU EDIF.LA MARQUETA PLANTA BAJA",
            entity_type: "company",
            id: "dq_AS9Aw99ZwEtVSGFJGCA",
            identification: "dq_AS9Aw99ZwEtVSGFJGCA",
            name: "COMERCIALIZADORA INTERNACIONAL GRUPO LA MARQUETA",
            sourceId: 45,
            url_source: "https://sayari.com/",
        }
        ];

        /*const myArrayFiltered = arrayData.filter((data) => {
            return metakeys.some((metakey) => {
                return metakey.name === data.userid;
            });
        });*/

        /*const myArrayFiltered = arrayData.filter((data) => {
        //const myArrayFiltered = arrayData.map(function (data, index, array) {
            //console.log(data);
            let arrayKeys = Object.keys(data);
            return metakeys.some((metakey) => {
                let arrayF = arrayKeys.map(function (key, index, array) {
                    if (metakey.name === key) {
                        //console.log(metakey.name + " : " + key)
                        return metakey.name === key;
                    }
                });
                console.log(arrayF)
                return arrayF;
            });
        });*/
        /*let arrayKeys = Object.keys(data);
        const myArrayFiltered = arrayData.filter((data) => {
            //const myArrayFiltered = arrayData.map(function (data, index, array) {
            //console.log(data);
            
            return metakeys.some((metakey) => {
                return arrayKeys.filter((data ) => {
                    console.log(data)
                    return metakey.name === data;
                });
                //console.log(arrayF)
            });
        });*/

        /*const myArrayFiltered = arrayData
            .filter((obj, key) => metakeys.filter(metakey => {
                //console.log(metakey.name)
                return metakey.name
                //}).includes(key)).reduce((obj, key) => {
            }).includes(Object.keys(obj).map(data => {
                console.log(Object.keys(obj))
                return data;
            }))).reduce((obj, key) => {
                console.log(key)
                //console.log(key)
                //console.log(obj[key] +":"+raw[key])
                obj[key] = raw[key];
                return obj;
            }, {});*/

        //console.log(myArrayFiltered);




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
        // Construir producto
        console.log(req.body);
        let nuevoProducto = req.body;
        //Verificar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);

            nuevoProducto.imagen = productoAnterior.imagen;
        }
        let producto = await Productos.findOneAndUpdate({ _id: req.params.idProducto },
            nuevoProducto, {
            new: true
        });
        //console.log(producto)
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

exports.buscarProducto = async (req, res, next) => {
    try {
        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') }); //Regular expresion para no aplicar case sensitive en la busqueda por nombre
        res.json(producto);
    } catch (error) {
        console.lo(error);
        next();
    }
}
