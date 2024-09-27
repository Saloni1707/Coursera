const mongoose = require ("mongoose");
mongoose.connect("");
const user = require("./routes/user");
const Schema = mongoose.Schema;
const ObjectId = mongoose.type.ObjectId;

const userSchema =new Schema({
    email : {type: String , unique : true},
    password: String ,
    firstname: String , 
    lastname: String,
});

const adminSchema = new Schema({
    email : {type: String , unique : true},
    password: String ,
    firstname: String , 
    lastname: String,

});

const courseSchema =new Schema({
    title : String ,
    description : String ,
    price : Number ,
    imageUrl : String ,
    creatorId: ObjectId 
});

const purchaseSchema =new Schema({
    userId : ObjectId , 
    courseId : ObjectId , //yaha pe u can add references

});

const userModel = mongoose.Model("user",userSchema); //creating the user model and insert usme userSchema ke data :)
const adminModel = mongoose.Model("admin",adminSchema);
const courseModel = mongoose.Model("course",courseSchema);
const purchaseModel = mongoose.Model("purchase",purchaseSchema);

module.export = {
    userModel: userModel, 
    adminModel: adminModel ,
    courseModel : courseModel ,
    purchaseModel : purchaseModel 
}
