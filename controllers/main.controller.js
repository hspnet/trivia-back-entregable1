import { constants } from "../services/utils/constants.js"
import { response } from "../services/utils/response.js"

const { status, message } = constants.response

/**
 * 
 * @param {*} req - El objeto de solicitud HTTP.
 * @param {*} res - El objeto de respuesta HTTP.
 */
const test = (req, res) => {
    res
        .status(status.OK)
        .json(response(true, message.OK))
}

/**
 * JSDoc: para documentar codigo 
 * @param {*} req - El objeto de solicitud HTTP.
 * @param {*} res - El objeto de respuesta HTTP.
 */

const not_found = (req, res) => {
    res
        .status(status.not_found)
        .json(response(false, message.not_found))
}

export {
    test,
    not_found
}