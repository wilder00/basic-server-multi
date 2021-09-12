import { Router, Request, Response } from 'express';

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
  res.json({
    ok: true,
    mensaje: 'post',
    cuerpo,
    de,
    id,

  })
})

export default router;