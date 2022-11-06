import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        minLength: 2,
        maxLength:50
    },
    apellido:{
        type: String,
        required: true,
        minLength: 2,
        maxLength:50
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;