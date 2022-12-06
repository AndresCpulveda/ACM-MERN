import express from 'express'

import checkAuth from '../middleware/checkAuth.js';
import { addRecord, getLastRecords } from '../controllers/clientsController.js';

const routerClients = express.Router()

routerClients.post("/", checkAuth, addRecord)
routerClients.get("/last-records", checkAuth, getLastRecords)



export default routerClients