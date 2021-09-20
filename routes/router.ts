import { Router, Request, Response } from 'express';
import { Socket } from 'socket.io';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

//handlers es la funcion que va a manejar la petición
router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo está bien'
  })
})
router.post('/mensajes', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  
  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;
  //con el in(id) especificamos a quién se desea emitir el evento
  server.io.emit( 'mensaje-nuevo', payload )

  res.json({
    ok: true,
    mensaje: 'post',
    cuerpo,
    de
  })
})

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;
  //con el in(id) especificamos a quién se desea emitir el evento
  server.io.in( id ).emit( 'mensaje-privado', payload )

  res.json({
    ok: true,
    mensaje: 'post',
    cuerpo,
    de,
    id,

  })
})

//servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;

  server.io.allSockets().then((clientes)=>{
    res.json({
        ok:true,
       // clientes
        clientes: Array.from(clientes)
    });
  }).catch((err)=>{
      res.json({
          ok:false,
          err
      })
  });

})

//Obtener usuario y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {
  

  res.json({
    ok:true,
    clientes: usuariosConectados.getLista()
  })  

})




export default router;