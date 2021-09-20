import { Socket } from "socket.io";
import socketio from 'socket.io';

export const disconnect = ( client: Socket)=>{
  client.on('disconnect', ()=>{
    console.log('|--> Cliente Desconectado');
    
  })
}

//escuchar mensajes
export const message = ( client: Socket, io: socketio.Server)=>{
  client.on('mensaje', (payload: {de: string, cuerpo: string}) => {
    console.log("Mensaje recibido: ", payload);
    
    //utilizamos io.emit, porque io tiene la referencia de todos los conectados
    io.emit('mensaje-nuevo',payload)

  });
}

//escuchar configurar usuario
export const  configurarUsuario= ( client: Socket, io: socketio.Server)=>{
  client.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
    console.log("configurando usuario: ", payload.nombre);
    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre}, configurado`
    })
  });
}