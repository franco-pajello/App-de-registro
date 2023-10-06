const { Schema } = require("mongoose");

const modelClieneMonto = new Schema({
  _id: { type: String, require: true },
  registro: [
    {
      _id: { type: String, require: true },
      dat: [
        {
          monto: { type: String, require: true },
          fecha: { type: String, require: true },
        },
      ],
    },
  ],
});

module.exports = { modelClieneMonto };
