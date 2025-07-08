const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(403).send({ auth: false, message: "Token no proporcionado" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).send({ auth: false, message: "Token inválido" });
        }

        req.userId = decoded.id;
        req.userEmail = decoded.email;
        req.userRol = decoded.rol;

        next();
    });
};
