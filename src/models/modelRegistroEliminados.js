const { Schema } = require("mongoose");

const modelRegistroEliminados = new Schema({
  _id: { type: String, require: true },
  registro: [
    {
      _id: { type: String, require: true },
      dat: [
        {
          producto: { type: String, require: true },
          precio: { type: String, require: false },
          fechaComprado: { type: String, require: false },
          fechaEliminado: { type: String, require: false },
        },
      ],
    },
  ],
});

module.exports = { modelRegistroEliminados };
