import { SERVER_PORT } from '../global/environment';
import express from 'express';
import socketio from 'socket.io'
import http from 'http'
import * as socket from '../sockets/socket'

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;

  public io: socketio.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);
    this.io = new socketio.Server(this.httpServer, { cors: { origin: true, credentials: true } });
    this.escucharSocket();
  }

  // algo estatico es algo que se puede llamar solo haciendo referencia a la clase
  // aplicamos el patron sigleton
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSocket() {
    console.log('Escuchando conexiones - Sockets');
    // on es para escuchar un evento
    this.io.on('connection', client => {
      console.log('cliente conectado');
      
      
      //verificando el envio de mensajes
      socket.message(client, this.io);


      //verificamos si el cliente se desconecta
      socket.disconnect(client);

    });
    
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}