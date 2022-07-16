import  express from 'express'
import userRoutes from './routes/userRoutes.js'


//Crear app
const app = express()

//routing
app.get('/',userRoutes)



app.get('/', (req, res) => {
    res.send('Servidor de bienes-raices')
})


//puerto para arrancar el proyecto
const port = 3000;

app.listen(port,()=>{
    console.log(`El servidor se está ejecutando en el puerto ${port}`)
})


