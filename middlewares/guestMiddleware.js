// para no ir al profile, y se redirija al login/register

const guestMiddleware = ( req, res, next )=>{
    
    if ( req.session.userLogged ) {
        return res.redirect('/user/profile')
    }

    next(); 

} 

module.exports = guestMiddleware; 