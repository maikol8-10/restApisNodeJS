const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuarios = async (req, res) => {

    //Leer datos de usuario
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        await usuario.save();
        res.json({ mensaje: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error' });
    }
}

exports.autenticarUsuario = async (req, res, next) => {

    //Buscar el usuario
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });
    if (!usuario) {
        //Si el usuario no existe
        await res.status(401).json({ mensaje: 'Ese usuario NO existe' });
        next();
    } else {
        //SI el usuario existe, verificar que el password es correcto o incorrecto
        if (!bcrypt.compareSync(password, usuario.password)) {
            //Si el password es incorrecto
            await res.status(401).json({ mensaje: 'Password Incorrecto' });
            next();
        } else {
            //Si el password es correcto, firmar el token
            //NOTA: Payload: Son los datos con lo que se firma el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            }, 'LLAVESECRETA', {
                expiresIn: '1h'
            });

            //Retornar el TOKEN
            res.json({ token });
        }
    }
}