const Contenedor = require('../container/contenedorMongo.js');
const modelo = require('../models/modelCliente.js').modeloCliente;
async function dao(elemento, _id) {
  const Dao = new this.schema({
    _id: _id,
    clientes: [
      {
        nombre: elemento.nombre,
        direccion: elemento.direccion,
        Altura: elemento.Altura,
        descripcion: elemento.descripcion,
      },
    ],
  });
  return await Dao.save();
}

class Cliente extends Contenedor.Contenedor {
  constructor() {
    super('cliente', modelo, dao);
  }
  async save(data, _idUsuario) {
    try {
      const r = await this.getById(_idUsuario);

      if (r[0] == undefined) {
        const DaoNewCliente = await this.dao(data, _idUsuario);
        return DaoNewCliente;
      }

      let y = await this.schema.updateOne(
        { _id: _idUsuario },
        {
          $push: {
            clientes: [
              {
                nombre: data.nombre,
                direccion: data.direccion,
                Altura: data.Altura,
                descripcion: data.descripcion,
              },
            ],
          },
        },
      );
      return y;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async deleteIdCliente(user, id) {
    try {
      let _idUser = user._id;

      let ubicacionCliente = `clientes`;

      this.schema
        .updateOne(
          { _id: _idUser },
          {
            $pull: {
              [ubicacionCliente]: { _id: id },
            },
          },
        )
        .catch((error) => console.log(error))
        .finally();

      return;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new Cliente();
