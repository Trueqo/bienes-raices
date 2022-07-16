
const formularioLogin = (req,res)=>{
    res.render('auth/login',{
        autenticado: false,
        página: 'Login'
    })
}

const formularioRegister = (req,res)=>{
    res.render('auth/register',{
        página: 'Crear cuenta'
    })
}




export {
    formularioLogin,
    formularioRegister
}