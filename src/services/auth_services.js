'use-strict'

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });

}

exports.decodeToken = async (token)=>{
    var data = await jwt.verify(token,global.SALT_KEY);
    return data;
}


exports.authorize = async (req,res,next)=>{
var token = await req.body.token || req.query.token|| req.headers["x-access-token"];

if(!token){
    res.status(401).json({
        message:"Acesso restrito"
    });

}else{
    jwt.verify(token,global.SALT_KEY,(error,decoded)=>{
        if(error){
            res.status(401).json({
                message:"Token invalido"
            });
        }else{
            next();
        }

    })
}

}

exports.isAdmin = async(req,res,next) =>{
   var token = await req.body.token || req.query.token|| req.headers["x-access-token"];

   if(!token){
    res.status(401).json({
        message:"Token invalido"
    });

}else{
    jwt.verify(token,global.SALT_KEY,(error,decoded)=>{
        if(error){
            res.status(401).json({
                message:"Token invalido"
            });
        }else {
            if(decoded.roles.includes('admin')){

                next();
            }else{
                res.status(403).json({
                    message:'esta funcionalidade so é perdida para administradores'
                });
            }
        }

    })
}

}