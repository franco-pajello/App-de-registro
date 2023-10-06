const mongoose = require("mongoose");
const modeloUsuario = new mongoose.Schema({
  username: { type: String, require: false },
  email: { type: String, require: false },
  direccion: { type: String, require: false },
  altura: { type: String, require: false },
  telefono: { type: String, require: false },
  password: { type: String, require: false },
});
const Usuarios = mongoose.model("usuarios", modeloUsuario);

module.exports = Usuarios;
