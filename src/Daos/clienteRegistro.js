const Contenedor = require("../container/contenedorMongo.js");
const modelo =
  require("../models/modelClienteRegistro.js").modeloClienteRegistro;
async function dao(elemento, _id, idCliente, date) {
  const Dao = new this.schema({
    _id: _id,
    registro: [
      {
        _id: idCliente,
        dat: [
          {
            producto: elemento.producto,
            precio: elemento.precio,
            fecha: Date(date),
          },
        ],
      },
    ],
  });
  return await Dao.save();
}

class ClienteRegistro extends Contenedor.Contenedor {
  constructor() {
    super("clienteRegistro", modelo, dao);
  }
  async save(info, _idUsuario, idCliente, date) {
    try {
      const buscandoUsuario = await this.getById(_idUsuario);
      if (buscandoUsuario[0] == undefined) {
        const DaoNewCliente = await this.dao(info, _idUsuario, idCliente, date);
        return DaoNewCliente;
      } else {
        let buscandoUsuarioRegistro = buscandoUsuario[0].registro;
        const indice = await buscandoUsuarioRegistro.findIndex(
          (e) => e._id == idCliente
        );
        let dat = `registro.${indice}.dat`;

        if (indice < 0) {
          await this.schema.updateOne(
            { _id: _idUsuario },

            {
              $push: {
                registro: [
                  {
                    _id: idCliente,
                    dat: [
                      {
                        producto: info.producto,
                        precio: info.precio,
                        fecha: date,
                      },
                    ],
                  },
                ],
              },
            }
          );
          return;
        }

        await this.schema.updateOne(
          { _id: _idUsuario },

          {
            $push: {
              [dat]: {
                producto: info.producto,
                precio: info.precio,
                fecha: Date(date),
              },
            },
          }
        );
        return;
      }
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  }
  /*   async getByIdDataCliente(_idUsuario, idCliente) {
    try {
      const buscandoUsuario = await this.getById(_idUsuario);
      if (buscandoUsuario[0].registro) {
        let buscandoUsuarioRegistro = buscandoUsuario[0].registro;
        const indice = await buscandoUsuarioRegistro.findIndex(
          (e) => e._id == idCliente
        );
        let dat = buscandoUsuario[0].registro[indice].dat;

        return dat;
      }
      return [];
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async upProductCliente(body, _idUsuario, idCliente, idProducto) {
    try {
      const buscandoUsuario = await this.getById(_idUsuario);
      let buscandoUsuarioRegistro = buscandoUsuario[0].registro;
      const indice = await buscandoUsuarioRegistro.findIndex(
        (e) => e._id == idCliente
      );

      let r = buscandoUsuario[0].registro[indice].dat;

      const indice2 = await r.findIndex((e) => e._id == idProducto);

      let dat = `registro.${indice}.dat.${indice2}`;

      await this.schema.updateOne(
        { _id: _idUsuario },
        {
          $set: {
            [dat]: {
              producto: body.producto,
              precio: body.precio,
              fecha: Date(body.fecha),
              _id: idProducto,
            },
          },
        }
      );
      return;
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  } */
  /*   async deleteIdProducto(params, user, idCliente) {
    try {
      let idProducto = params.id;
      let _idUser = user._id;

      const buscandoUsuario = await this.getById(_idUser);
      let RegistroUsuario = buscandoUsuario[0].registro;
      const indice = await RegistroUsuario.findIndex((e) => e._id == idCliente);

      let ubicacionCliente = `registro.${indice}.dat`;

      this.schema
        .updateOne(
          { _id: _idUser },
          {
            $pull: {
              [ubicacionCliente]: { _id: idProducto },
            },
          }
        )
        .catch((error) => console.log(error))
        .finally();

      return;
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  } */
  /*  async DeleteAll(idCliente, user) {
    try {
      let _idUser = user.id;
      this.schema
        .updateOne(
          { _id: _idUser },
          {
            $pull: {
              registro: { _id: idCliente },
            },
          }
        )
        .catch((error) => console.log(error))
        .finally();
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  } */
}
module.exports = new ClienteRegistro();
