const express= require("express");
const app= express();
const bodyParser = require("body-parser");
//const request= require("request");

app.use(bodyParser.urlencoded({ extended:true}));

app.get("/",function(req,res){
  
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});