const express = require("express");
const ejs = require("ejs");
const path = require("path")
const { connect } = require("mongoose");
const useRoute = require("./routs/url");
const staticRoute  = require("./routs/staticRouts")
const userRoute = require("./routs/user");
const {ristrictedTOLoggedInUserOnly} = require("./midlleware/auth");
const cookieParser = require("cookie-parser");

const PORT = 8001;

const app = express();
//middleware-->plugin...
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
//conneciton-->
connect("mongodb://127.0.0.1:27017/url")
  .then(() => console.log("dbConnected..."))
  .catch((err) => console.log("Err: ", err));

//view-->
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

//rout-->
app.use("/url",ristrictedTOLoggedInUserOnly ,useRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
