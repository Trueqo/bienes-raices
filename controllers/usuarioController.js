import {check, validationResult} from 'express-validator'
import Usuario from "../models/Usuario.js"


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
    
    

    const usuario = await Usuario.create(req.body)

    res.json(usuario)

}

const formularioLostPassword = (req,res)=>{
    res.render('auth/lost-password',{
        pagina: 'Recuperar contraseña'
    })
}




export {
    formularioLogin,
    formularioRegister,
    formularioLostPassword,
    register
}