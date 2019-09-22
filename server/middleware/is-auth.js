const jwt = require('jsonwebtoken')
module.exports = (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; // Authorization: Bearer token:token
    if(!token || token ===''){
        req.isAuth = false;
        console.log("Autorization in route.");
        return next();
    }
    console.log("Autorization in route.2");

    let decodedToken;
    try{
        decodedToken = jwt.verify(token,'wj1i2233dllm')
    }catch(err){
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}