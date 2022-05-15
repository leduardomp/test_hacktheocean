import { Router } from 'express'
import embarcacion from '../controllers/embarcacion.controller'

const router = Router();
 
//Raiz
router.get('/', embarcacion.findAll)

router.get('/:id', (req, res) => {    
    res.status(200).json(
        {
            "Title": "embarcaciones con id"
        }
    );
})

router.post('/{id}', (req, res) => {    
    res.status(200).json(
        {
            "Title": "embarcaciones"
        }
    );
})

module.exports = router;