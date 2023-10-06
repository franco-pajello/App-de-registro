const { model } = require('mongoose');

const connecToMongo = require('../utils/connectToMongo.js').ConnecToMongo;
class Contenedor {
  constructor(schema, modelo, dao) {
    this.schema = model(schema, modelo);
    this.modelo = modelo;
    this.dao = dao;
  }

  async getAll() {
    await connecToMongo.getInstance();
    try {
      const arrayDeElementos = await this.schema.find({});
      return arrayDeElementos;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getById(id) {
    try {
      const idUser = await this.schema.find({ _id: id });

      return idUser;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getByIdCliente(data, _id) {
    try {
      const cliente = await this.schema.find({ _id: _id });

      if (cliente.length == 0) {
        return false;
      } else {
        let Clientes = await cliente[0].clientes;
        let ClientesFilter = false;
        Array.isArray(Clientes) &&
          Clientes.filter((e) => {
            let direccionDB = e.direccion.toUpperCase().split(' ');
            let newDireccion = data.direccion.toUpperCase().split(' ');
            if (Clientes.length < 0) {
              return (ClientesFilter = false);
            } else {
              for (let i = 0; i < direccionDB.length; i++) {
                if (newDireccion.includes(direccionDB[i]) && e.Altura == data.Altura) {
                  ClientesFilter = true;
                  break;
                } else {
                  ClientesFilter = false;
                }
              }
            }
          });
        return ClientesFilter;
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getByIdDataCliente(_idUsuario, idCliente) {
    try {
      const buscandoUsuario = await this.getById(_idUsuario);
      if (buscandoUsuario[0] != undefined) {
        let buscandoUsuarioRegistro = buscandoUsuario[0].registro;
        const indice = await buscandoUsuarioRegistro.findIndex((e) => e._id == idCliente);

        let dat = buscandoUsuario[0].registro[indice].dat;

        return dat;
      }
      return [];
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async save(e) {
    await connecToMongo.getInstance();
    try {
      const arrayDeElementos = await this.dao(e);
      return arrayDeElementos;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async deleteIdProducto(params, user, idCliente) {
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
          },
        )
        .catch((error) => console.log(error))
        .finally();

      return;
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  }
  async DeleteAll(idCliente, user) {
    try {
      let _idUser = user.id;
      this.schema
        .updateOne(
          { _id: _idUser },
          {
            $pull: {
              registro: { _id: idCliente },
            },
          },
        )
        .catch((error) => console.log(error))
        .finally();
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  }
}

module.exports = { Contenedor };
