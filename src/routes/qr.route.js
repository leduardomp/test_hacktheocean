import {Router} from 'express'
import * as qr from '../controllers/qr.controller'

const router = Router()

router.get('/create/:idEmbarcacion', qr.create)
//router.post('/logout', auth.logout)

module.exports = router;