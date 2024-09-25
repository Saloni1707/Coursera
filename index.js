const express = require ("express");
const mongoose  = require("mongoose");

const app = express();
const { userRouter } = require("./routes/user");
const { userCourse } = require("./routes/course");
const {adminrouter} = require("./routes/admin")

// createCourseRoutes(app);       
// createUserRoutes(app);      

app.use("/api/v1/user",userRouter);   
app.use("/api/v1/course",userCourse);
app.use("/api/v1/admin",adminrouter);
async function main(){ 
    //use dotend to put ur environment variables ka (string) in another file
    await mongoose.connect("mongodb+srv://SaloniAtole:Qs72aKQ7eaZHkiuF@cluster0.po79z.mongodb.net/Coursera-app");
    app.listen(3000);
    console.log("Listening on the port ");

}
main()