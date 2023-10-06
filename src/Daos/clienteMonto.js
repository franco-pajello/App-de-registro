const Contenedor = require("../container/contenedorMongo.js");
const modelo = require("../models/modelClieneMonto.js").modelClieneMonto;
async function dao(elemento, _id, idCliente, date) {
  const Dao = new this.schema({
    _id: _id,
    registro: [
      {
        _id: idCliente,
        dat: [
          {
            monto: elemento.monto,
            fecha: date,
          },
        ],
      },
    ],
  });
  return await Dao.save();
}

class ClieneMonto extends Contenedor.Contenedor {
  constructor() {
    super("clienteMonto", modelo, dao);
  }
  async save(info, _idUsuario, idCliente, date) {
    try {
      const resGetById_idUsuario = await this.getById(_idUsuario);
      if (resGetById_idUsuario[0] == undefined) {
        const DaoNewCliente = await this.dao(info, _idUsuario, idCliente, date);
        return DaoNewCliente;
      } else {
        let resGetById_idUsuarioRegistro = resGetById_idUsuario[0].registro;
        const indice = await resGetById_idUsuarioRegistro.findIndex(
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
                        monto: info.monto,
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
                monto: info.monto,
                fecha: date,
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
      const resGetById_idUsuario = await this.getById(_idUsuario);
      if (resGetById_idUsuario[0].registro) {
        let resGetById_idUsuarioRegistro = resGetById_idUsuario[0].registro;
        const indice = await resGetById_idUsuarioRegistro.findIndex(
          (e) => e._id == idCliente
        );
        let dat = resGetById_idUsuario[0].registro[indice].dat;

        return dat;
      }
      return [];
    } catch (err) {
      return { success: false, error: err };
    }
  } */
  async upProductCliente(body, _idUsuario, idCliente, idProducto) {
    try {
      const resGetById_idUsuario = await this.getById(_idUsuario);
      let resGetById_idUsuarioRegistro = resGetById_idUsuario[0].registro;
      const indice = await resGetById_idUsuarioRegistro.findIndex(
        (e) => e._id == idCliente
      );

      let r = resGetById_idUsuario[0].registro[indice].dat;

      const indice2 = await r.findIndex((e) => e._id == idProducto);

      let dat = `registro.${indice}.dat.${indice2}`;

      await this.schema.updateOne(
        { _id: _idUsuario },
        {
          $set: {
            [dat]: {
              monto: body.monto,
              fecha: body.fecha,
            },
          },
        }
      );
      return;
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  }
}
module.exports = new ClieneMonto();
