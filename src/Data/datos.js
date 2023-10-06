const Cliente = require('../Daos/cliente.js');
const ClienteRegistro = require('../Daos/clienteRegistro.js');
const ClienteRegistroEliminado = require('../Daos/clienteRegistroEliminado.js');
const ClienteMonto = require('../Daos/clienteMonto.js');

async function GetHomeDatoData(_id) {
  const resGetHomeDatoData = await Cliente.getById(_id);
  return resGetHomeDatoData;
}
async function PostNewClienteData(data, _id) {
  const ResbuscandoCliente = await Cliente.getByIdCliente(data, _id);
  if (!ResbuscandoCliente) {
    await Cliente.save(data, _id);
    return ResbuscandoCliente;
  }
  return ResbuscandoCliente;
}
async function PostUpData(body, user, date) {
  const idCliente = body.id;
  const idUsuario = user._id;
  const resPostUpData = await ClienteRegistro.save(body, idUsuario, idCliente, date);
  return resPostUpData;
}
async function PutUpData(body, user) {
  const idCliente = body.id;
  const idUsuario = user._id;
  const idProducto = body.idProd;

  const resPutUpData = await ClienteRegistro.upProductCliente(body, idUsuario, idCliente, idProducto);

  return resPutUpData;
}
async function GetIdClienteData(_id, id) {
  const resGetIdClienteData = await ClienteRegistro.getByIdDataCliente(_id, id);
  const resGetIdClienteMontoData = await ClienteMonto.getByIdDataCliente(_id, id);
  const resGetIdClienteRegistroEliminado = await ClienteRegistroEliminado.getByIdDataCliente(_id, id);
  let resDeuda = '';
  if (resGetIdClienteData.success != false) {
    let deuda = [];
    Array.isArray(resGetIdClienteData) &&
      resGetIdClienteData.forEach((element) => {
        deuda.push(parseFloat(element.precio));
      });
    resDeuda = await deuda.reduce((acc, i) => {
      return (acc = acc + i);
    }, 0);
    /* 
    if (resGetIdClienteMontoData.success == false) {
      console.log('2');

      const total = resDeuda;
      return [resGetIdClienteData, { total }];
    } */

    let monto = [];
    let montoDeProductoEliminado = [];

    Array.isArray(resGetIdClienteMontoData) &&
      resGetIdClienteMontoData.forEach((element) => {
        monto.push(parseFloat(element.monto));
      });
    let resMonto = await monto.reduce((acc, i) => {
      return (acc = acc + i);
    }, 0);

    Array.isArray(resGetIdClienteRegistroEliminado) &&
      resGetIdClienteRegistroEliminado.forEach((element) => {
        montoDeProductoEliminado.push(parseFloat(element.precio));
      });
    let resmontoDeProductoEliminado = await montoDeProductoEliminado.reduce((acc, i) => {
      return (acc = acc + i);
    }, 0);
    const total = resDeuda + resmontoDeProductoEliminado - resMonto;

    return [resGetIdClienteData, { total }];
  }
  return undefined;
}
async function PostMontoData(body, user, date) {
  const { _id } = user;
  const { id } = body;
  const resPostUpData = await ClienteMonto.save(body, _id, id, date);
  return resPostUpData;
}
async function DeleteIdData(params, user, body, date) {
  let { idCliente } = body;
  let idProducto = params.id;
  const resDeleteIdData = await ClienteRegistro.deleteIdProducto(params, user, idCliente);
  await ClienteRegistroEliminado.save(body, user, idProducto, date);

  return resDeleteIdData;
}
async function DeleteIdClienteData(id, user) {
  await ClienteRegistro.DeleteAll(id, user);
  await ClienteRegistroEliminado.DeleteAll(id, user);
  await ClienteMonto.DeleteAll(id, user);
  const resDeleteIdClienteData = await Cliente.deleteIdCliente(user, id);

  return resDeleteIdClienteData;
}
async function DeleteAllData(idCliente, user) {
  const resDeleteAll = await ClienteRegistro.DeleteAll(idCliente, user);
  await ClienteRegistroEliminado.DeleteAll(idCliente, user);
  await ClienteMonto.DeleteAll(idCliente, user);
  return resDeleteAll;
}
module.exports = {
  GetHomeDatoData,
  /*   GetLoginDatoData, */
  PostNewClienteData,
  PostUpData,
  GetIdClienteData,
  PutUpData,
  PostMontoData,
  DeleteIdData,
  DeleteAllData,
  DeleteIdClienteData,
};
