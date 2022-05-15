import { Router } from 'express'
import * as tipoUsuario from '../controllers/tipoUsuario.controller'
import * as token from '../middlewares/token.middleware'

const router = Router();
 
//Raiz
router.get('/', token.authenticateToken, tipoUsuario.findAll)

module.exports = router;