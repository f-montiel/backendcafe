import { Router } from "express";
import { borrarProducto, crearProducto, editarProducto, listarProductos, obtenerProductos } from "../controllers/producto.controller";
import { check } from "express-validator";
const router = Router();

router.route('/productos')
    .get(listarProductos)
    .post([
        check('nombreProducto')
        .notEmpty()
        .withMessage('El nombre del producto es un dato obligatorio')
        .isLength({
            min:2,
            max:100
        })
        .withMessage('El nombre del produco tiene que tener entre 2 y 100 caracteres'),
        check('precio')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isNumeric()
        .withMessage('El precio tiene que ser un dato numerico')
        .custom((value)=>{
            if(value >= 1 & value <= 10000){
                return true;
            } else {
                throw new Error('El precio tiene que ser entre 1 y 10000 pesos');
            }
        }),
        // con .matches(expresion regular) se puede validar expresiones regulares.
        check('imagen')
        .notEmpty()
        .withMessage('La imagen es obligatoria'),
        check('categoria')
        .notEmpty()
        .withMessage('La categoria es obligatoria')
    ],crearProducto)
    .delete(borrarProducto);
router.route('/productos/:id')
    .get(obtenerProductos)
    .put(editarProducto)
    .delete(borrarProducto);

export default router;