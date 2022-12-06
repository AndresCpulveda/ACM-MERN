import Admin from "../models/Admins.js";
import generateId from "../helpers/generateId.js";
import generateJwt from "../helpers/generateJwt.js";

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


const authenticate = async (req, res) => {
  const {email, password} = req.body;

  const account = await Admin.findOne({email})
  if(!account) {
    return res.status(404).json({msg: 'Correo invalido'})
  }

  if(!account.confirmed) {
    return res.status(403).json({msg: 'Cuenta no ha sido confirmada'})
  }

  const isValid = await account.checkPassword(password)

  if(!isValid) {
    return res.status(400).json({msg: 'Contraseña incorrecta'})
  }

  res.json({
    id: account._id,
    name: account.name,
    email: account.email,
    token: generateJwt(account._id)
  })
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
    console.log(error);
  }
}


const profile = (req, res) => {
  res.json(req.admin)
}


const changeProfile = async (req, res) => {
  const {admin} = req;
  const {name, email} = req.body;
  const account = await Admin.findById(admin.id)
  if(!account) {
    return res.status(404).json({msg: 'Enlace invalido o sesion caducada'})
  }
  if(admin.email != email) {
    const exists = await Admin.findOne({email})
    if(exists) {
      return res.status(403).json({msg: 'Correo ya está en uso'})
    }
  }
  try {
    account.name = name || account.name;
    account.email = email || account.email;
    await account.save()
    res.json({msg: 'Cuenta modificada con exito'})
  } catch (error) {
    console.log(error);
  }
}


const changePassword = async(req, res) => {
  const {current, changed} = req.body.passwords;
  const {admin} = req;

  const account = await Admin.findById(admin.id)

  if(!account) {
    return res.status(404).json({msg: 'Enlace invalido o sesion expirada'})
  }

  const isValid = await account.checkPassword(current)
  if(!isValid) {
    return res.status(400).json({msg: 'Contraseña incorrecta'})
  }

  try {
   account.password = changed
   await account.save() 
   res.json({msg: 'Contraseña cambiada con exito'})
  } catch (error) {
    console.log(error);
  }
}

export {register, authenticate, confirmAccount, forgotPassword, validateTokenPassword, newPassword, profile, changeProfile, changePassword}