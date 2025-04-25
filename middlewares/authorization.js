import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import {usuarios} from "../controllers/authentication.controller.js";

dotenv.config();

function soloAdmin(req, res, next){
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect("/");
}

function soloPublico(req, res, next){
    const logueado = revisarCookie(req);
    if(!logueado) return next();
    return res.redirect("/admin");
}

function revisarCookie(req){
    try{
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodficada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);
        console.log(decodficada);
        const usuarioAControlar = usuarios.find(usuario => usuario.user === decodficada.user);
        console.log(usuarioAControlar);
        if(!usuarioAControlar){
            return false
        }
        return true;
    }
    catch{
        return false;
    }
}

export const methods = {
    soloAdmin,
    soloPublico
}