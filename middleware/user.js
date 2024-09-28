const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
function userMiddleware(req,res,next){
    const token = req.headers.token ;
    const decoded = jwt.verify(token,JWT_SECRET);
    if(decoded){
        res.json = decoded.id ;
        next()
    }else{
        res.json({
            message:"You aren't signed in "
        })
    }

}
module.exports={
    userMiddleware : userMiddleware
}
