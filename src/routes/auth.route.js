let {Router} = require('express');
let auth = require('../controllers/auth.controller')
//let token = require('../middlewares/token.middleware')

const router = Router()

router.post('/login', auth.login)
//router.post('/logout', token.authenticateToken,  auth.logout)

module.exports = router;