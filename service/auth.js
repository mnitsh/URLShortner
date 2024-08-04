
const jwt = require("jsonwebtoken");
const { use } = require("../routs/url");
const secret = "shahank@123$%#&*!";
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secret);
}

function getUser(tocken){
    if(!tocken) return null;
    try {
        return jwt.verify(tocken,secret); 
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}