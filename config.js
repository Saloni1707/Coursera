//store all your pwd here and prevent the circular dependency 
const JWT_SECRET = process.env.JWT_SECRET
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

module.exports=({
    JWT_ADMIN_PASSWORD ,
    JWT_SECRET 
})