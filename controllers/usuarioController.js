import {check, validationResult} from 'express-validator'
import Usuario from "../models/Usuario.js"
import { generarId } from '../helpers/tokens.js'
import { emailRegistro } from '../helpers/emails.js'

const formularioLogin = (req,res)=>{
    res.render('auth/login',{
        autenticado: false,
        pagina: 'Login'
    })
}

const formularioRegister = (req,res)=>{
    res.render('auth/register',{
        pagina: 'Crear cuenta'
    })
}

const register = async (req,res)=>{
    //validación
    await check('nombre').notEmpty().withMessage('Debe llenar el campo nombre').run(req)
    await check('email').isEmail().withMessage('Ingrese un email valido').run(req)
    await check('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres').run(req)
    await check('repetirpassword').equals(req.body.password).withMessage('La contraseña debe ser iguales').run(req)
    console.log(req.body.password)

    let resultado = validationResult(req)

    
    
    // return res.json(resultado.array())
    //verifica que el usuario este vacio
    if (!resultado.isEmpty()){
        //cuando hay errores
        return res.render('auth/register',{
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            usuario:{
                nombre: req.body.nombre,
                email: req.body.email
            }
        })   
    }

    //Extrar datos del usuario
    const {nombre, email, password} = req.body

    //verificación para evitar un doble registro
    const exiteUser = await Usuario.findOne({where: {email}})
    if (exiteUser){
        //cuando hay errores
        return res.render('auth/register',{
            pagina: 'Crear cuenta',
            errores: [{msg:'el usuario ya existe'}],
            usuario:{
                nombre: req.body.nombre,
                email: req.body.email
            }
        })   
    }   

    //crear usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token:generarId()
    })

    //Enviar email de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })
    //mostrar mensaje de confirmacion
    res.render('templates/mensajes',{
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Por favor verifique su correo para confirmar su cuenta'
    })

    
}

//funcion para comprobar una cuenta
const confirmar = async (req,res)=>{
    
    const {token} = req.params

    //Verificamos si el token es valido
    const usuario = await Usuario.findOne({where:{token}})


    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina: 'Error',
            mensaje: 'El token no es valido',
            error: false
        })
    }

    //Confirmar la cuenta
    
    usuario.token =null
    usuario.confirmado = true
    await usuario.save()

    return res.render('auth/confirmar-cuenta',{
        pagina: 'Cuenta confirmada',
        mensaje: 'La cuenta se confirmó correctamente',
        error : true
    })
}


const formularioLostPassword = (req,res)=>{
    res.render('auth/lost-password',{
        pagina: 'Recuperar contraseña'
    })
}




export {
    formularioLogin,
    formularioRegister,
    confirmar,
    formularioLostPassword,
    register
}