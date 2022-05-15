import { Router } from 'express'

const router = Router();
 
//Raiz
router.get('/', (req, res) => {    
    res.status(200).json(
        {
            "Title": "embarcaciones"
        }
    );
})

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