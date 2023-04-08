const mongoose=require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');
// User.plugin(uniqueValidator);

  
const bcrypt=require("bcrypt");
const User=new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,

    },
    Password:{
        type:String,
        required:true,
        unique:true
    },
    ConfirmPassword:{
        type:String,
        required:true
        
    },
    Branch:{
        type:String,
        required:true
    },
    Semester:{
        type:Number,
        required:true
    }
})
User.pre("save", async function(next) {
    if (this.isModified("Password")) {
        console.log(`current Password is ${this.Password}`);
        this.Password = await bcrypt.hash(this.Password, 10);
        this.ConfirmPassword = undefined;
    }
    next();
});
User.index({ Username: 1 }, { unique: true });
 
const signup=new mongoose.model("signup",User); 
module.exports=signup;