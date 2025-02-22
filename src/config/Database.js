const mongoose = require("mongoose");

const connectDB =async()=>{
    await mongoose.connect("mongodb+srv://Vishal49:ea8dLXNVfj4dt8RM@learningnode.wyk6f.mongodb.net/Users");
};

module.exports = connectDB;

