import jwt from 'jsonwebtoken'

const generateJwt = (id) => {
  return jwt.sign({id}, process.env.JWT_KEY, {expiresIn: "5d"})
}

export default generateJwt
