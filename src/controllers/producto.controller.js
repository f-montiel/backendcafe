import { validationResult } from "express-validator";
import Producto from "../models/producto";

export const listarProductos = async(req, res)=>{
    try {
        const productos = await Producto.find({});
        res.status(200).json(productos);
    } catch (error) {
        res.status(404).json({
            mensaje: "Error al buscar los productos"
        });
    }
}

export const obtenerProductos = async(req, res)=>{
    try {
       //extraer el id de la ruta
        const id = req.params.id;
        // Buscar el producto por id
        const producto = await Producto.findById(id);
        // responder con el producto
        res.status(200).json(producto);
    } catch (error) {
        res.status(404).json({
            mensaje: "Error al buscar el producto"
        });
    }
}

export const crearProducto = async(req, res)=>{
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
        const productoNuevo = new Producto(req.body);
        await productoNuevo.save();
        res.status(201).json({
            mensaje: "El producto fue creado."
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "No se pudo guardar el producto."
        });
    }
}

export const editarProducto = async(req, res)=>{
    try {
        // extraer el id del parametro y los datos del objeto que quiero actualizas;
        const id = req.params.id;
        const producto = req.body;
        // Actualizar el producto en la db
        await Producto.findByIdAndUpdate(id, producto);
        // responder
        res.status(200).json({
            mensaje: "El producto fue actualizado"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "El producto no fue editado"
        });
    }
}

export const borrarProducto = async(req, res)=>{
    try {
        const id = req.params.id;
        await Producto.findByIdAndDelete(id);
        res.status(200).json({
            mensaje: "Producto Borrado"
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "El producto no fue borrado"
        });
    }
}