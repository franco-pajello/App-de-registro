const { Router } = require('express');
const routerDatos = Router();
const {
  GetHomeDatosController,
  GetLoginDatosController,
  GetRegistroDatosController,
  PostNewClienteController,
  GetIdClienteController,
  PostUpController,
  PutUpController,
  PostMontoController,
  DeleteIdController,
  DeleteAllController,
  getLogoutController,
  DeleteIdClienteController
} = require('../controller/datos.js');
const cors = require('cors');
const { login } = require('../passport/passportLocal.js');
const { signup } = require('../passport/passportRegistro.js');
const session = require('express-session');
const { store } = require('../cookie/cookieMongo.js');
const passport = require('passport');
routerDatos.use(cors({ origin: '*' }));
routerDatos.use(
  session({
    store: store,
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  }),
);
/* routerDatos.use(
  session({
    store: storeRedis,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 86400000, //un dia
    },
    rolling: true,
    resave: true,
    secret: 'secreto',
    saveUninitialized: false,
  }),
); */
routerDatos.use(passport.initialize());
routerDatos.use(passport.session());

routerDatos.get('/', GetHomeDatosController);
routerDatos.get('/cliente/:id', GetIdClienteController);
routerDatos.get('/registro', GetRegistroDatosController);

routerDatos.get('/error', async (req, res) => {
  return res.redirect('/error');
});
routerDatos.get('/logout', getLogoutController);
routerDatos.post('/newcliente', PostNewClienteController);
routerDatos.post('/up', PostUpController);
routerDatos.put('/up', PutUpController);
routerDatos.post('/monto', PostMontoController);
routerDatos.delete('/eliminar/:id', DeleteIdController);
routerDatos.delete('/eliminarCliente/:id', DeleteIdClienteController);
routerDatos.delete('/eliminarTodo/:id', DeleteAllController);

routerDatos.post(
  '/registro',
  passport.authenticate(signup, {
    successRedirect: '/',
    failureRedirect: '/error',
  }),
);

routerDatos.post(
  '/login',
  passport.authenticate(login, {
    failureRedirect: '/error',
    /*     successRedirect:'/'
     */
  }),
  GetLoginDatosController,
);

module.exports = { routerDatos };
