import express from "express"
import { confirmar, formularioLogin, formularioLostPassword, formularioRegister, register } from "../controllers/usuarioController.js"

const router = express.Router() 


router.get('/login',formularioLogin)

router.get('/register',formularioRegister)
router.post('/register',register)

router.get('/confirmar/:token',confirmar)

router.get('/lost-password',formularioLostPassword)


export default router