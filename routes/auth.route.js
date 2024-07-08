import { Router } from "express";
import { login, register, deleteUser } from "../controllers/auth.controller.js";

const auth_router = Router()

auth_router.post('/register', register)

auth_router.post('/login', login)

auth_router.delete('/delete/:nickname', deleteUser)

export default auth_router