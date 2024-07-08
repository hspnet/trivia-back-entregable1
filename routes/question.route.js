import { Router } from "express";
import createQuestion from "../controllers/question.controller.js";
import { valid_token } from "../services/middleware/valid-token.js";

const question_router = Router()

question_router.post('/create', valid_token, createQuestion)

export default question_router