import express from 'express'
import connection from './database/db.js'
import router from './routes/main.route.js'
import { constants } from './services/utils/constants.js'
import { not_found } from './controllers/main.controller.js'
import cors from 'cors'

const app = express() //crea una instancia de una aplicación Express
const port = process.env.PORT //asigna a la constante port el valor de la variable de entorno PORT.

//Abro conexion a base de datos
await connection()

/*app.use(cors({
    origin: 'http://127.0.0.1:5173/register'
}))*/

app.use(cors())

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json())

//Llamado a al cntrolador 
app.use('/api', router)

//cuando hace un llamado a algo que no existe
app.get('*', not_found)
app.post('*', not_found)
app.delete('*', not_found)



app.listen(port, () => console.log(`Server on port: ${port}`))