import express from 'express'

import checkAuth from '../middleware/checkAuth.js';
import { addRecord, deleteRecord, getAllRecords, getLastRecords, searchName, searchPlate } from '../controllers/clientsController.js';

const routerClients = express.Router()

routerClients.post("/", checkAuth, addRecord)
routerClients.post("/last-records", checkAuth, getLastRecords)
routerClients.get("/all-records", checkAuth, getAllRecords)
routerClients.post("/search-plate", checkAuth, searchPlate)
routerClients.post("/search-name", checkAuth, searchName)
routerClients.post("/search-name", checkAuth, searchName)
routerClients.delete("/:id", checkAuth, deleteRecord)



export default routerClients