const fs = require("fs");
const path = require("path");

let pathLog = path.join(__dirname, "../logs/userLogs.txt");

function userLogs(req, res, next) {
  fs.appendFileSync(pathLog, "User accessed path" + req.url + "\n");
  next();
}

module.exports = userLogs;
