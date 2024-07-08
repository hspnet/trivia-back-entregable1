import mongoose from "mongoose"

//Llamamos los datos necesarios para la conexion
const userdb = process.env.USERDB
const passdb = process.env.PASSDB
const hostdb = process.env.HOSTDB
const namedb = process.env.NAMEDB

const url = `mongodb+srv://${userdb}:${passdb}@${hostdb}/${namedb}`

//creo la funcion connection 
const connection = async () => {
    try {
        await mongoose.connect(url)
        console.log('Database connected');
    } catch (error) {
        console.log('Error Database', error);
        process.exit(1)
    }
}

export default connection