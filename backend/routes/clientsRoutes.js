import express from 'express'

import checkAuth from '../middleware/checkAuth.js';
import { addRecord, getAllRecords, getLastRecords, searchName, searchPlate } from '../controllers/clientsController.js';

const routerClients = express.Router()

routerClients.post("/", checkAuth, addRecord)
routerClients.get("/last-records", checkAuth, getLastRecords)
routerClients.get("/all-records", checkAuth, getAllRecords)
routerClients.get("/search-plate", checkAuth, searchPlate)
routerClients.get("/search-name", checkAuth, searchName)



export default routerClients