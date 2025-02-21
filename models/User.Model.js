const mongoose = require("mongoose");
// const {isEmail} = require( "validator" );
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters"],
    },
    username: {
      type: String,
      // required:true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      // required:true
    }
    
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
