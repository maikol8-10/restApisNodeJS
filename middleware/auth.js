const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //Autorización por medio del header
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('No autenticado, no hay JWD');
        error.statusCode = 401; //No está autorizado
        throw error; //Se manda a pantalla y deja de ejecutarse
    }

    //Obtener el token y verificarlos
    const token = authHeader.split(' ')[1];
    let revisiarToken;
    try {
        revisiarToken = jwt.verify(token, 'LLAVESECRETA');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    //Si es un token valido pero hay un error
    if (!revisiarToken) {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }
    next(); //Si pasa todo, pasa al siguiente middleware
}