import { SERVER_PORT } from '../global/environment';
import express from 'express';
import socketio from 'socket.io'
import http from 'http'

export default class Server {
  public app: express.Application;
  public port: number;

  public io: socketio.Server;
  private httpServer: http.Server;

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);
    this.io = new socketio.Server(this.httpServer, { cors: { origin: true, credentials: true } });
    this.escucharSocket
  }

  private escucharSocket() {
    console.log('Escuchando conexiones - Sockets');
    // on es para escuchar un evento
    this.io.on('connection', client => {
      console.log('cliente conectado');

    });
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}