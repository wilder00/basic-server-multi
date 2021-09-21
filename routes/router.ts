import { Router, Request, Response } from 'express';
import { Socket } from 'socket.io';
import { GraficaData } from '../classes/grafica';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();
const grafica = new GraficaData();

//handlers es la funcion que va a manejar la petición
router.get('/grafica', (req: Request, res: Response) => {
  res.json(
    grafica.getDataGrafica()
  )
})
router.post('/grafica', (req: Request, res: Response) => {
  const mes = req.body.mes;
  const unidades = Number(req.body.unidades);

  grafica.incrementarValor(mes, unidades)
  const server = Server.instance;
  //con el in(id) especificamos a quién se desea emitir el evento
  server.io.emit('cambio-grafica', grafica.getDataGrafica())

  res.json(grafica.getDataGrafica());
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
  server.io.in(id).emit('mensaje-privado', payload)

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

  server.io.allSockets().then((clientes) => {
    res.json({
      ok: true,
      // clientes
      clientes: Array.from(clientes)
    });
  }).catch((err) => {
    res.json({
      ok: false,
      err
    })
  });

})

//Obtener usuario y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {


  res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
  })

})




export default router;