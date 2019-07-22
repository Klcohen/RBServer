const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req,res,next) => {
    if(req.method !== 'OPTIONS'){    
    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) =>{
        if(!err && decodedToken){
            console.log('decoded here',decodedToken);
            User.findOne({where:{id: decodedToken.id}})
            .then(user => {
                if(!user) throw err;
                req.user = user;
                return next();
            })
            .catch(err => next(err));
        }else{
            req.errors = err;
            return res.status(500).send('Not authorized')
        }
    })} else {
       return next()
    }
};

module.exports = validateSession