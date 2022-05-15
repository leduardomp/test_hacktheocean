import { Router } from 'express'
import * as usuario from '../controllers/usuarios.controller'
import * as token from '../middlewares/token.middleware'

const router = Router();
 
//Raiz
router.get('/', token.authenticateToken, usuario.findAll)
router.get('/:idUsuario', token.authenticateToken, usuario.findOne)
router.post('/', token.authenticateToken, usuario.create)
router.put('/', token.authenticateToken, usuario.update)
router.delete('/:idUsuario', token.authenticateToken, usuario.delete)

module.exports = router;