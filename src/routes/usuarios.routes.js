import { Router } from "express";
import { check } from "express-validator";
import { crearUsuario, listarUsuarios } from "../controllers/usuario.controller";

const router = Router();

router.route('/usuarios')
.get(listarUsuarios)
.post([
    check('nombre')
    .notEmpty()
    .withMessage('El nombre es un campo obligatorio')
    .isLength({
        min:2,
        max:50
    })
    .withMessage('El nombre debe tener de 2 a 50 digitos'),
    check('apellido')
    .notEmpty()
    .withMessage('El apellido es un campo obligatorio')
    .isLength({
        min:2,
        max: 50
    }),
    check('email')
    .notEmpty()
    .withMessage('El email es un campo obligatorio')
    .matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .withMessage('Tiene que ser un correo electronico'),
    check('password')
    .notEmpty()
    .withMessage('La contraseña es un campo obligatorio')
],crearUsuario);

export default router;