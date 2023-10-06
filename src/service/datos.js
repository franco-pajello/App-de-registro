const { GetHomeDatoData, PostNewClienteData, PostUpData, GetIdClienteData, PutUpData, PostMontoData, DeleteIdData, DeleteAllData, DeleteIdClienteData } = require('../Data/datos.js');
const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/utc'));
require('dayjs/locale/es');
async function GetHomeDatosService(_id) {
  const resGetHomeDatosService = await GetHomeDatoData(_id);
  return resGetHomeDatosService;
}
async function getLogoutDatosService() {
  try {
    return `/`;
  } catch (error) {
    console.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function PosLoginDatosService(id) {
  try {
    return '/';
  } catch (error) {
    console.log(error);
  }
}
async function PostNewClienteService(data, _id) {
  const resPostNewClienteData = await PostNewClienteData(data, _id);

  return resPostNewClienteData;
}
async function PostUpService(body, user) {
  const date = dayjs(new Date()).utc().add(10, 'days').format();
  const resPostUpData = await PostUpData(body, user, date);

  return resPostUpData;
}
async function PutUpService(body, user) {
  const resPutUpData = await PutUpData(body, user);
  return resPutUpData;
}
async function GetIdClienteService(_id, id) {
  const resGetIdClienteData = await GetIdClienteData(_id, id);
  return resGetIdClienteData;
}
async function PostMontoService(body, user) {
  const date = dayjs(new Date()).utc().add(10, 'days').format();
  const resPostMontoData = await PostMontoData(body, user, date);
  return resPostMontoData;
}
async function DeleteIdClienteService(id, user) {
  const resDeleteIdClienteData = await DeleteIdClienteData(id, user);
  return resDeleteIdClienteData;
}
async function DeleteIdService(params, user, body) {
  const date = dayjs(new Date()).utc().add(10, 'days').format();
  const resDeleteIdData = await DeleteIdData(params, user, body, date);
  return resDeleteIdData;
}
async function DeleteAllService(params, user) {
  let idCliente = params.id;
  const resDeleteAllData = await DeleteAllData(idCliente, user);
  return resDeleteAllData;
}
module.exports = {
  GetHomeDatosService,
  PosLoginDatosService,
  PostNewClienteService,
  PostUpService,
  GetIdClienteService,
  PutUpService,
  PostMontoService,
  DeleteIdService,
  DeleteAllService,
  getLogoutDatosService,
  DeleteIdClienteService,
};
