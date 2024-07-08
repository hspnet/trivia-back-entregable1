/**
 * Esta fución de flecha devuelve un objeto con tres propiedades
 * @param {*} process - Valor pasado a la función.
 * @param {*} message - Valor pasado a la función.
 * @param {*} data - El parámetro data tiene un valor predeterminado de un array vacío ([]).
 * @returns 
 */

export const response = (process, message, data = []) => {
    return {
        process,
        message,
        data
    }
}