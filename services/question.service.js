import { response } from "./utils/response.js"
import { constants } from "./utils/constants.js"
import Question from "../models/question.js"
import question_regex from "./validations/question.validation.js"

const { status, message } = constants.response

const register = async question_request => {

    const { error } = question_regex.validate(question_request)
    if (error) return response(false, error.details[0].message)

    const question_db = new Question(question_request)

    const new_question = await question_db.save()

    return response(true, message.question_created, new_question)
}

export default register