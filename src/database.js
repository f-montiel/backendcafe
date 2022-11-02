import mongoose from "mongoose";
// usuario de la base de datos f-montiel contrseña om11062013
const url = "mongodb+srv://f-montiel:om11062013@cluster0.csnnjye.mongodb.net/cafe";

mongoose.connect(url);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("db conectado");
})