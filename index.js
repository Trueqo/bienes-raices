import  express from 'express'
import userRoutes from './routes/userRoutes.js'


//Crear app
const app = express()

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


