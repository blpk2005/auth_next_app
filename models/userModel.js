import { verify } from 'crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true,"please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})
const User = mongoose.models.Users || mongoose.model('User', userSchema);
 
export default User;