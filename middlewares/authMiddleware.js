// para ir al profile si esta login y que no vaya nuevamente al login 

const authMiddleware = (req, res, next)=>{

    if ( !req.session.userLogged ) {
        res.redirect('/user/login')
    }
    next()
}

module.exports = authMiddleware; 