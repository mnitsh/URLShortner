const { getUser } = require("../service/auth");

function checkForAuthentication() {
  const authorizationHeaderValue = req.header["authorization"];
  req.user = null;
  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  )
    return next();
  const tocken = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(tocken);
  req.user = user;
  next();
}

function ristrictTo(roles =[]){
  return function (req,res,next){
    if(!req.user) return res.redirect('login');

    if(!roles.includes(req.user.role))
        return res.end("unatorized user...");
  }
}

async function ristrictedTOLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies.uid;
  if (!userUid) return res.render("login");

  const user = getUser(userUid);
  if (!user) return res.render("login");
  req.user = user;
  next();
}

module.exports = { ristrictedTOLoggedInUserOnly };
