import { Router } from "express";
import { test } from "../controllers/main.controller.js";
import auth_router from "./auth.route.js";
import { valid_token } from "../services/middleware/valid-token.js";
import question_router from "./question.route.js";


/*se utilizada en aplicaciones Express para crear un nuevo enrutador. 
El enrutador permite agrupar y manejar rutas específicas de manera modular.*/
const router = Router()

/*definimos una ruta especifica en Express.js que tiene un 
path ( La ruta en la cual el controlador responderá.) y un 
handler  (La función que maneja la solicitud cuando se accede a la ruta.)*/
router.get('/test', test)

//definimos un conjunto sub-enrutador en un camino específico /auth y auth_router es otro enrutador que contiene rutas adicionales

/*definimos un sub-enrutador que contiene rutas adicionales en Express.js que tiene un 
path ( La ruta base a la cual se aplica el middleware o sub-enrutador.) y un 
middleware  ( La función de middleware o el sub-enrutador a montar.)*/
router.use('/auth', auth_router)

//Ruta para preguntas
router.use('/question', question_router)


const contro = (req, res) => {
    res.status(200).json({
        msg: 'Tu score es 1000'
    })
}

router.get('/score', valid_token, contro)

export default router