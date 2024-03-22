const jwt = require('jsonwebtoken')

module.exports = async(req,res,next)=>{
    try{
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,"SECRET_KEY")
        const user = decodedToken;
        req.user = user;
        next();
    }catch{
        console.log(err)
        res.status(401).json({
            error:new Error("Invalid Request")
        })
    }
}