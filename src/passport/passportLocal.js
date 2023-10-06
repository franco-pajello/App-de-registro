const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Usuarios = require("../models/usuarios.js");
const { isValidPassword } = require("./funciones/validaciones.js");
const { ConnecToMongo } = require('../utils/connectToMongo.js')

ConnecToMongo.getInstance();
let login = new LocalStrategy(async (username, password, done) => {
  try {
    Usuarios.findOne({ username: `${username}` }, (err, user) => {
      if (err) {
        console.log("error", "127.0.0.1 - error inexperado en logeo", err);
        return done(err);
      }
      if (!user) {
        console.log("info", "127.0.0.1 - log info no se encontro el usuario");
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log("info", "127.0.0.1 - log info contraseña invalida");
        return done(null, false);
      }

      return done(null, user);
    });
  } catch (error) {
    console.log(error);
  }
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

module.exports = { login };
