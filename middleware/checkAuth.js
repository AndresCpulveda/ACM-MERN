import jwt from 'jsonwebtoken'
import Admin from '../models/Admins.js'

const checkAuth = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      const account = await Admin.findById(decoded.id).select('-password -token -confirmed')
      req.admin = account;
      if(account) {
        return next()
      }
    } catch (error) {
      return res.status(404).json('No existe cuenta asociada')
    }
  }
  if(!token) {
    return res.status(404).json({msg: 'Token no valido o inexistente'})
  }
}

export default checkAuth