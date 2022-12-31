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

const allowedDomains = [process.env.FRONTEND_URL]
//Creamos una autorizacion de cors para interactuar entre en fronend desde una ip y el backend desde un ip diferente (ver vid 465)
const corsOptions = {
  origin: function (origin, callback) {
    if(allowedDomains.indexOf(origin) !== -1) {
      //El origen del request esta permitido
      callback(null, true)
    }else {
      callback(new Error('No permitido por CORS'))
    }
  }
}

app.use(cors(corsOptions))////Permite que la app use los metodos http en cors
app.use(cors({
  origin: allowedDomains
}));

app.use("/api/administrators", routerAdministrators)
app.use("/api/clients", routerClients)



const port = 4000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
})