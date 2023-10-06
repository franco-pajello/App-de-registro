const LocalStrategy = require("passport-local").Strategy;
const Usuarios = require("../models/usuarios");
const passport = require("passport");
const { createHash } = require("../passport/funciones/validaciones.js");
/* const { emailDeRegistro } = require('../utils/emails.js');
const { loger } = require('../logs/logWinston.js'); */
const { ConnecToMongo } = require("../utils/connectToMongo.js");

ConnecToMongo.getInstance();
let signup = new LocalStrategy(
  {
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    Usuarios.findOne({ username: `${username}` }, function (err, user) {

      if (err) {
        console.log("error", "127.0.0.1 - error inexperado en logeo", err);
        return done(err);
      }
      if (user) {
        console.log("error", "127.0.0.1 - usuario exixtente passport registro");
        return done(null, false);
      }
      const newUser = {
        username: username.toLocaleLowerCase(),
        email: req.body.email,
        direccion: req.body.direccion,
        altura: req.body.altura,
        telefono: req.body.telefono,
        password: createHash(password),
      };

      Usuarios.create(newUser, (err, userWintId) => {
        if (err) {
          console.log("error", "127.0.0.1 - error al crear el usuario", err);
          return done(err);
        }
  /*       emailDeRegistro(
          req.body.email,
          username,
          req.body.edad,
          req.body.telefono
        ); */
        return done(null, userWintId);
      });
    });
  }
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});
module.exports = { signup };
