/* const server = n */

import { SERVER_PORT } from "./global/environment";
import Server from "./classes/server";
import router from "./routes/router";
import express from "express";
import cors from "cors";

import bodyParser from "body-parser";

// Server.instance es para aplicar el patron singleton en vez de new Server()
const server = Server.instance;

// BODY PARSER
// se debe configurar el bodyParser antes de usarlo
// parece ser que ya no es necesario usar el bodyParse
server.app.use(express.urlencoded({ extended: true }))
server.app.use(express.json())


// CORS
// se está permitiendo que cualquier persona puede llamar al servicio
server.app.use(cors({ origin: true, credentials: true }))


server.app.use("/", router)



server.start(() => {
  console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);

});