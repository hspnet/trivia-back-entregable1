import { response } from "./utils/response.js"
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { delete_regex, login_regex, user_regex } from "./validations/auth.validation.js"
import jwt from "jsonwebtoken"
import { constants } from "./utils/constants.js"

const { status, message } = constants.response


/***
 * función para registrar un usuario
 */
const register = async user_request => {

    const { error } = user_regex.validate(user_request)
    if (error) return response(false, error.details[0].message)

    //findOne es un método que se utiliza para buscar un solo documento que cumpla con ciertos criterios en la base de datos.
    const is_nickname = await User.findOne({ nickname: user_request.nickname })

    if (is_nickname) return response(false, 'nickname already exist')

    /*const is_cel = await User.findOne({ cel: user_request.cel })
    if (is_cel) return response(false, 'celular already exist')*/

    //Este código utiliza la palabra clave delete de JavaScript para eliminar la propiedad confirm_password del objeto user_request. 
    delete user_request.confirm_password

    //aplica la funcion Salt
    const salt = await bcrypt.genSalt(5)
    //Almacena el resultado del hash
    const hash = await bcrypt.hash(user_request.password, salt)

    /*
    se utiliza para crear un nuevo objeto user_request que incluye todas las propiedades del objeto user_request original,
     pero con la propiedad password actualizada con el valor de hash.

    ...user_request: Este es el operador de propagación o spread operator en JavaScript. Se utiliza para copiar todas las 
    propiedades enumerables de un objeto user_request existente dentro de un nuevo objeto.
    */
    user_request = {
        ...user_request,
        password: hash
    }

    //crea una nueva instancia del modelo User utilizando los datos contenidos en el objeto user_request.
    const user_db = new User(user_request)

    /*se utiliza para guardar (o crear) un nuevo documento de usuario en una base de datos utilizando una operación asincrónica.
    wait: Se utiliza en funciones marcadas como async para esperar a que una operación asincrónica se complete antes de continuar con la ejecución del código. 
    save: Es un método proporcionado por la biblioteca ORM (como Mongoose) que se utiliza para guardar un documento (o registro) en la base de datos. 
    */
    const new_user = await user_db.save()

    return response(true, message.user_created, new_user)
}

/**
 * 
 * @param {*} login_request 
 * @returns 
 */
const login = async (login_request) => {

    const { error } = login_regex.validate(login_request)
    if (error) return response(false, error.details[0].message)

    const user_db = await User.findOne({ nickname: login_request.nickname })
    if (!user_db) return response(false, 'User don\'t exist')

    const valid_password = await bcrypt.compare(login_request.password, user_db.password)
    if (!valid_password) return response(false, 'Incorrect password')

    const payload = {
        id: user_db._id,
        name: user_db.name,
        cel: user_db.cel
    }

    const sign_options = { expiresIn: '300s' }

    const token = jwt.sign(payload, process.env.TOKEN, sign_options)

    return response(true, 'Login success', token)
}

const deleteUser = async (delete_request) => {

    const { error } = delete_regex.validate(delete_request)
    if (error) return response(false, error.details[0].message)

    const user_db = await User.findOne({ nickname: delete_request.nickname })
    if (!user_db) return response(false, 'User don\'t exist')

    const deletedUser = await user_db.deleteOne({ user_db: delete_request.nickname })

    return response(true, message.user_deleted, user_db)

}

export {
    register,
    login,
    deleteUser
}