import mongoose from "mongoose";
import bcrypt from 'bcrypt'

import generateId from "../helpers/generateId.js";



const adminSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  email: {type: String, lowercase: true, unique: true, required: true, trim: true},
  password: {type: String, required: true, trim: true},
  confirmed: {type: Boolean, default: false},
  token: {type: String, default: generateId()}
})

adminSchema.pre('save', async function(next) {
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

adminSchema.methods.checkPassword = async function(submittedPswd) {
  return await bcrypt.compare(submittedPswd, this.password)
}

const Admin = mongoose.model('Admin', adminSchema);

export default Admin