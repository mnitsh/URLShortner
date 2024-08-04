const user = require("../Models/user");
const {v4: uuidv4} = require("uuid");
const {getUser,setUser} = require("../service/auth")

async function handlerCreateUser(req, res) {
  const { name, email, password } = req.body;
  await user.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handelUserLogin(req, res) {
  const { email, password } = req.body;
  const validUser = await user.findOne({ email, password });
  if (!validUser) {
    return res.render("login", {
      err: "Invalid User or Password..",
    });
  }
  const tocken = setUser(user);
  res.cookie("uid",tocken);
  return res.redirect("/");
}

module.exports = { handlerCreateUser, handelUserLogin };
