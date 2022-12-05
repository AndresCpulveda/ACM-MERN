import express from 'express'

import checkAuth from '../middleware/checkAuth.js';
import {register, authenticate, confirmAccount, forgotPassword, validateTokenPassword, newPassword, profile, changeProfile, changePassword} from '../controllers/adminsController.js';

const routerAdministrators = express.Router()

//Public Area
routerAdministrators.post("/", authenticate);
routerAdministrators.get("/confirm/:token", confirmAccount)

routerAdministrators.post("/register", register)
routerAdministrators.post("/forgot-password", forgotPassword)
routerAdministrators.route("/forgot-password/:token").get(validateTokenPassword).post(newPassword)

//Private Area
routerAdministrators.get("/", checkAuth, profile)
routerAdministrators.put("/change-profile", checkAuth, changeProfile)
routerAdministrators.put("/change-password", changePassword)


export default routerAdministrators