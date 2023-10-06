const express = require("express");
const APP = express();
const PORT = 8080;
const http = require("http").createServer(APP);
const cors = require("cors");
const { routerDatos } = require("./src/router/datos.js");
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(cors({ origin: "*" }));
APP.set("view engine", "ejs");
APP.set("views", "./src/views");
APP.use("/public", express.static(__dirname + "/src/public"));

routerDatos.use("/public", express.static(__dirname + "/src/public"));
APP.use("/", routerDatos);

http.listen(PORT, () => {
  console.log(
    "info",
    `servidor htpp escuchado em el puerto http://localhost:${PORT}`
  );
});
