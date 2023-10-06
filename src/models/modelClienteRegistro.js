const { Schema } = require("mongoose");

const modeloClienteRegistro = new Schema({
  _id: { type: String, require: true },
  registro: [
    {
      _id: { type: String, require: true },
      dat: [
        {
          producto: { type: String, require: true },
          precio: { type: String, require: false },
          fecha: { type: String, require: false },

        },
      ],
    },
  ],
});

module.exports = { modeloClienteRegistro };
