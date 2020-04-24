const md5 = require("md5");

const db = require("../db");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("auth/login", {
      error: "User does not exist."
    });
    return;
  }

  const hashedPassword = md5(password);

  if (hashedPassword !== user.password) {
    res.render("auth/login", {
      error: "Wrong password.",
      values: req.body
    });
    return;
  }

  res.cookie("userId", user.id);

  res.redirect("/users");
};
