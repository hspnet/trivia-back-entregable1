import register from "../services/question.service.js"
import { constants } from "../services/utils/constants.js"

const { status, message } = constants.response

const createQuestion = async (req, res) => {
    const question_db = await resgister_service(req.body)
    res
        .status(status.OK)
        .json(question_db)
}

export default createQuestion