const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    emailID: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true   
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate: {
            validator: function(value) {
                return ["male", "female", "others"].includes(value);
            },
            message: "Gender data is not valid"
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.kindpng.com/imgv/ioJmwwJ_dummy-profile-image-jpg-hd-png-download/",
    },
    about: {
        type: String,
        default: "This is the default about for the user!"
    },
    skill: {
        type: [String]
    }
},{timestamps:true,});

module.exports = mongoose.model("User", userSchema);
