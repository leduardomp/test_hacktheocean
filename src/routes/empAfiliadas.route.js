import { Router } from 'express'
import * as empAfiliadas from '../controllers/empAfiliadas.controller'
import * as token from '../middlewares/token.middleware'

const router = Router();
 
//Raiz
router.get('/', token.authenticateToken, empAfiliadas.findAll)
router.get('/:idEmpresa', token.authenticateToken, empAfiliadas.findOne)
router.post('/', token.authenticateToken, empAfiliadas.create)
router.put('/', token.authenticateToken, empAfiliadas.update)
router.delete('/:idEmpresa', token.authenticateToken, empAfiliadas.delete)

module.exports = router;