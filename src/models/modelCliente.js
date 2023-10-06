const { Schema } = require('mongoose');

const modeloCliente = new Schema({
  _id: { type: String, require: true },
  clientes: [
    {
      nombre: { type: String, require: false },
      direccion: { type: String, require: false },
      Altura: { type: String, require: false },
      descripcion: { type: String, require: false },
    },
  ],
});

module.exports = { modeloCliente };
