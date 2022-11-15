const jwt = require("jsonwebtoken");
const APP_SECRET = "secret";
const USERNAME = "admin";
const PASSWORD = "admin";
const BASE_URL = "http://localhost:3500";
module.exports = function (req, res, next) {
  if (
    (req.url == `${BASE_URL}/login` || req.url == "/login") &&
    req.method == "POST"
  ) {
    if (
      req.body != null &&
      req.body.username === USERNAME &&
      req.body.password === PASSWORD
    ) {
      let token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false });
    }
    res.end();
    return;
  } else if (
    ((req.url.startsWith(`${BASE_URL}/products`) ||
      req.url.startsWith("/products") ||
      req.url.startsWith(`${BASE_URL}/categories`) ||
      req.url.startsWith("/categories")) &&
      req.method != "GET") ||
    ((req.url.startsWith(`${BASE_URL}/orders`) ||
      req.url.startsWith("/orders")) &&
      req.method != "POST")
  ) {
    let token = req.headers["authorization"];
    if (token != null && token.startsWith("Bearer<")) {
      token = token.substring(7, token.length - 1);
      try {
        jwt.verify(token, APP_SECRET);
        next();
        return;
      } catch (err) {}
    }
    res.statusCode = 401;
    res.end();
    return;
  }
  next();
};
