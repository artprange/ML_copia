let admins = ["Athena", "Kahuna"];

function admin(req, res, next) {
  let user = req.query.user;
  if (user) {
    admins.forEach(function (admin) {
      if (user == admin) {
        next();
      }
    });
  } else {
    res.send("No Administrative privileges were found! Acces Denied!");
  }
}

module.exports = admin;
