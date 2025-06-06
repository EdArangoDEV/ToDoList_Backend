require('./config/dbMongo');

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var taskRouter = require("./routes/tasks");
var goalsRouter = require("./routes/goals");

var app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Especifica el origen exacto
  credentials: true // Permite credenciales
}));


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware para verificar la autorización
app.use((req, res, next) => {
  if (req.headers.authorization && req.headers.authorization === "123") {
    next();
  } else {
    res.status(401).json({ mesage: "Unauthorized" });
  }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tasks", taskRouter);
app.use("/goals", goalsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


module.exports = app;
