/***
 * Se definen los estados y los mensajes
 */
export const constants = {
    response: {
        status: {
            OK: 200,
            not_found: 404,
            not_auth: 401
        },
        message: {
            OK: 'Server on.',
            not_found: 'Not found.',
            not_auth: 'Not Authorized.',
            not_jwt: 'Not Valid JWT.',
            user_created: 'User created.',
            question_created: 'Question created.',
            user_deleted: 'User deleted'
        }
    }
}

