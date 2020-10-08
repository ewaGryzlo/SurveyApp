module.exports = (req,res,next)=>{
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    next();

};
//w routes można wtedy dac const isAuth = require('../middleware/is-auth');