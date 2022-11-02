import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import './database'
import productoRouter from './routes/productos.routes'

// crear una instancia de express
const app = express();
// configurar un puerto
app.set("port",process.env.PORT || 4000);

app.listen(app.get("port"), ()=>{
    console.log("Estoy en el puerto " + app.get("port"));
})

// midlewares son funciones que se ejecutan antes de las rutas.

app.use(cors()); // Permite request externos.
// Permiten interpretar el formato json
app.use(express.json());
// ver documentacion de express midelware
app.use(express.urlencoded({extends:true}));
//para obtener mayor informacion en la consola;
app.use(morgan('dev'));
// Archivo estatico
// console.log(path.join(__dirname, "../public));
app.use(express.static(path.join(__dirname, "../public")));

// Rutas

app.use('/apicafe', productoRouter);