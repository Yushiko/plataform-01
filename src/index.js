const express = require("express");
const morgan = require("morgan");
const expresshbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const sqlStore = require("express-mysql-session");
const passport = require("passport");
const Handlebars = require("handlebars");
const { database } = require("./keys");

const bodyParser = require("body-parser");

//nuevos helpers para handle
//Handlebars.registerHelper("ifCond", function(v1, v2, options) {
  //if (v1 === v2) {
    //return options.fn(this);
  //}
  //return options.inverse(this);
//});

Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

//inicializaciones
const app = express();
require("./lib/passport");

//configuraciones
app.set("port", process.env.PORT || 3306);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expresshbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
app.set("view enginer", ".hbs");

//funciones
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "ae4rtdfg",
    resave: false,
    saveUninitialized: false,
    store: new sqlStore(database)
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
  app.locals.alert = req.flash("alert");
  app.locals.user = req.user;
  next(); //toma la informacion del usuario, lo que el servidor quiere responder y toma la funcion para continuar con el codigo
});

//rutas
app.use(require("./routes"));
app.use(require("./routes/authentications"));
app.use("/administrador", require("./routes/admin"));
app.use("/usuario", require("./routes/users"));
app.use("/Profesor", require("./routes/teachers"));

//archivos publicos
app.use(express.static(path.join(__dirname, "public")));

//iniciar
app.listen(app.get("port"), () => {
  console.log("Conectando al puerto ", app.get("port"));
});

//direccionamiento de modulos
app.use(
  "/css",
  express.static(__dirname + "../../node_modules/bootstrap/dist/css")
);
app.use(
  "/js",
  express.static(__dirname + "../../node_modules/bootstrap/dist/js")
);
app.use("/js", express.static(__dirname + "../../node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "../../node_modules/popper.js/dist"));
