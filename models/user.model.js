import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, 'UserName is required'],
    trim: true,
    minLength: 3,
    maxLength: 50,
   },
   email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
   },
   password: {
    type: String,
    required: [true, 'Password is required'], 
   }

}, { timestamps: true });

//create a model out of the schema
const User = mongoose.model('User', userSchema);

export default User;