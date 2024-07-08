import { register as register_service, login as login_service, deleteUser as delete_service } from "../services/auth.service.js"
import { constants } from "../services/utils/constants.js"

const { status, message } = constants.response

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const register = async (req, res) => {
    const user_db = await register_service(req.body)
    res
        .status(status.OK)
        .json(user_db)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {
    const user_db = await login_service(req.body)
    res
        .status(status.OK)
        .json(user_db)
}

/**
 * 
 * @param {*} req 
 * @param {*} resp 
 */
const deleteUser = async (req, res) => {
    const user_db = await delete_service(req.params)
    res
        .status(status.OK)
        .json(user_db)
}

export {
    register,
    login,
    deleteUser
}