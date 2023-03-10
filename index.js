const path = require("path");

const express = require("express");
const morgan = require("morgan");
const http = require('http');

const fs = require('fs')

const app = express();




const httpServer = http.createServer(app);


app.set("view engine", "ejs");
app.set("views", "views");

app.use("/static", express.static("public"));

const uploaderRoute = require("./routes/uploader.js");
const error404 = require("./routes/error404.js");
const uploaderController = require("./controllers/uploader.js");
const downloaderRoute = require("./routes/downloaderRoute.js");

app.use(morgan("dev"));

app.use(uploaderRoute);

app.use(downloaderRoute)
app.use(error404);

app.use(uploaderController);

console.log(path.join(__dirname, "uploads"));


httpServer.listen(80);


