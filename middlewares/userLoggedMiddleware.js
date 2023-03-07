const User = require('../models/UserModels');

const userLogged = (req, res, next)=>{
    //let isLogged = false;
    res.locals.isLogged = false;

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
   

    next();
}

module.exports = userLogged; 