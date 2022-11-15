const express = require("express");
const history = require("connect-history-api-fallback");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const auth = require("./authMiddleware");
const router = jsonServer.router("data.json");
const app = express();
app.use(bodyParser.json());
app.use(auth);
app.use("/api", router);
app.use(history());
app.use("/", express.static("./dist"));
app.listen(81, function () {
  console.log("Serwer HTTP działa na porcie 81");
});
