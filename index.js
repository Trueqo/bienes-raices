import  express from 'express'
import userRoutes from './routes/userRoutes.js'
import db from './config/db.js'

//Crear app
const app = express()

//Habilitar lectura de datos de formularios
app.use(express.urlencoded({extended: true}))

//Conexión a la base de datos
try{
    await db.authenticate()
    db.sync()
    console.log('Conexión a la base de datos exitosa')
}
catch(error){
    console.log(error)
}



//habilitando pug
app.set('view engine', 'pug')
app.set('views', './views')


//carpeta pública
app.use(express.static('public'))


//routing
app.use('/auth',userRoutes)

//puerto para arrancar el proyecto
const port = 3000;

app.listen(port,()=>{
    console.log(`El servidor se está ejecutando en el puerto ${port}`)
})


