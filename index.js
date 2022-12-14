import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

import routerAdministrators from "./routes/adminsRoutes.js";
import routerClients from "./routes/clientsRoutes.js";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());
dotenv.config()

connectDB()

app.use(cors());

app.use("/api/administrators", routerAdministrators)
app.use("/api/clients", routerClients)



const port = 4000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
})