import express from "express"

const router = express.Router() 


router.get('/', (req, res) => {
    res.send('Servidor de bienes-raices')
})


export default router