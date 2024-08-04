const mongoose = require("mongoose");

async function connectMongoDb(url) {
    return 
      mongoose.connect(url)
      .then((res) => console.log("dbconnected..."))
      .catch((err) => console.log("ERR: ", err));
  }
  

  module.exports = {connectMongoDb}