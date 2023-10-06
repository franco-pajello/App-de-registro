const { render } = require('ejs');
const {
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
} = require('../service/datos.js');
let ClienteAutenticado = false;
async function GetHomeDatosController(req, res) {
  try {
    let isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      const { _id, username } = await req.user;
      ClienteAutenticado = await GetHomeDatosService(_id);
      return await res.render('pages/index', {
        ClienteAutenticado: ClienteAutenticado[0],
        username,
      });
    }

    return await res.render('partials/form');
  } catch (error) {
    console.log(error);
  }
}
async function getLogoutController(req, res, next) {
  try {
    const getLogoutDatosServices = await getLogoutDatosService();

    req.session.destroy((err) => {
      if (err) res.send('error inesperado');
      ClienteAutenticado = false;
      return res.redirect(getLogoutDatosServices);
    });
  } catch (error) {
    console.log(error);
  }
}
async function GetLoginDatosController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    let resPosLoginDatosService = await PosLoginDatosService();
    return await res.redirect(resPosLoginDatosService);
  } catch (error) {
    console.log(error);
  }
}
async function GetRegistroDatosController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    return res.render('partials/formRegistro');
  } catch (error) {
    console.log(error);
  }
}
async function GetIdClienteController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    const { _id } = req.user;
    const { id } = req.params;
    const resGetIdClienteService = await GetIdClienteService(_id, id);
    if (resGetIdClienteService == undefined) {
      return res.json({ success: false });
    }
    return res.json(resGetIdClienteService);
  } catch (error) {
    console.log(error);
  }
}
async function PostNewClienteController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    const data = req.body;
    const { _id } = req.user;
    const resPostNewClienteservice = await PostNewClienteService(data, _id);
    return res.json(resPostNewClienteservice);
  } catch (error) {
    console.log(error);
  }
}
async function PostUpController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      const { body } = req;
      const { user } = req;
      const resPostUpService = await PostUpService(body, user);
      return res.json({ resPostUpService });
    }

    return res.render('/');
  } catch (error) {
    console.log(error);
  }
}
async function PutUpController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      const { body } = req;
      const { user } = req;
      const resPutUpService = await PutUpService(body, user);
      return res.json({ resPutUpService });
    }

    return res.render('/');
  } catch (error) {
    console.log(error);
  }
}
async function PostMontoController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      const { body } = req;
      const { user } = req;
      const resPostMontoService = await PostMontoService(body, user);
      return resPostMontoService;
    }
    return render('/');
  } catch (error) {
    console.log(error);
  }
}
async function DeleteIdController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      const { params } = req;
      const body = req.body;
      const { user } = req;
      const resDeleteIdService = await DeleteIdService(params, user, body);
      return resDeleteIdService;
    }
    return render('/');
  } catch (error) {
    console.log(error);
  }
}
async function DeleteIdClienteController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      const { id } = req.params;
      const { user } = req;
      const resDeleteIdClienteService = await DeleteIdClienteService(id, user);
      return resDeleteIdClienteService;
    }
    return render('/');
  } catch (error) {
    console.log(error);
  }
}
async function DeleteAllController(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next;
    } else {
      return res.redirect('/');
    }
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      const { params } = req;
      const { user } = req;
      const resDeleteAllService = await DeleteAllService(params, user);
      return resDeleteAllService;
    }
    return render('/');
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
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
  DeleteIdClienteController,
};
