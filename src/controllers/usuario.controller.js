import Usuario from "../models/usuario";
import { validationResult } from "express-validator";

export const listarUsuarios = async(req, res)=>{
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(404).json({
            mensaje: "Error al buscar los usuarios"
        })
    }
}

export const crearUsuario = async(req, res)=>{
    // trabajar con el resultado de la validacion.
    const errors = validationResult(req);
    // errors tiene un metodo .isEmpty()
    if(!errors.isEmpty()){
        return res.status(400).json({
            errores: errors.array()
        });
    }
  try {
      console.log(req.body);
      const usuarioNuevo = new Usuario(req.body);
      await usuarioNuevo.save();
      res.status(201).json({
          mensaje: "El usuario fue creado."
      });
  } catch (error) {
      console.log(error);
      res.status(404).json({
          mensaje: "No se pudo guardar el usuario"
      });
  }
}