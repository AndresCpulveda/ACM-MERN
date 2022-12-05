import Admin from "../models/Admins.js";
import generateId from "../helpers/generateId.js";

const register = async (req, res) => {
  const {name, email, password} = req.body;

  const doesExist = await Admin.findOne({email})
  if(doesExist) {
    return res.status(400).json('El usuario ya existe')
  }
  try {
    const registered = {name, email, password}
    const admin = new Admin(registered)
    const saved = await admin.save()
    res.json(saved)
  } catch (error) {
    console.log(error);
  }
}


const authenticate = (req, res) => {
}


const confirmAccount = async (req, res) => {
  const {token} = req.params;
  const account = await Admin.findOne({token})
  if(!account) {
    return res.status(404).json('Enlace no valido')
  }
  try {
    account.confirmed = true;
    account.token = null;
    await account.save()
    res.json({msg: 'Cuenta confirmada exitosamente'})
  } catch (error) {
    console.log(error);
  }
}


const forgotPassword = async (req, res) => {
  const {email} = req.body;

  const account = await Admin.findOne({email})

  if(!account) {
    return res.status(404).json({msg: 'No existe cuenta asociada al email'})
  }

  try {
    account.token = generateId();
    await account.save()
    res.json({msg: 'Email de restablecimiento enviado'})
  } catch (error) {
    console.log(error);
  }
}


const validateTokenPassword = async (req, res) => {
  const {token} = req.params;

  const account = await Admin.findOne({token})

  if(!account) {
    return res.status(404).json({msg: 'Enlace no es valido'})
  }
  res.json({msg: 'Enlace valido, cambie password'})
}


const newPassword = async (req, res) => {
  const {password} = req.body;
  const {token} = req.params;

  const account = await Admin.findOne({token})

  if(!account) {
    return res.status(404).json({msg: 'Enlace ya no es valido'})
  }

  try {
    account.password = password;
    account.token = null;
    await account.save()
    res.json({msg: 'Contraseña cambiada'})
  } catch (error) {
    
  }
}


const profile = (req, res) => {

}


const changeProfile = (req, res) => {

}


const changePassword = (req, res) => {

}

export {register, authenticate, confirmAccount, forgotPassword, validateTokenPassword, newPassword, profile, changeProfile, changePassword}