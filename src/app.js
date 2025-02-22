const express = require("express");

const connectDB = require("./config/Database");

const app = express();
const User=require("./models/user");
app.post("/signup",async (req,res)=>{

    const user =new User({
        firstName:"Virat",
        lastName: "Kohli",
        emailID:"viratKohli@gmail.com",
        password:"Million@26",
    })
    await user.save();
    res.send("User added successfully");

});




connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7000, () => {
      console.log("Hello server i m running in background");
    });
  })
  .catch((err) => {
    console.error("Database not be connectDB");
  });
