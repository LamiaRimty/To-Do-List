const express= require("express");
const app= express();
const bodyParser = require("body-parser");
//const request= require("request");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true}));

app.get("/",function(req,res){
    
    var options={
        weekday: "long",
        day : "numeric",
        month : "long"
    };
    var today= new Date();
    var day = today.toLocaleDateString("en-US",options); //formated date pasted in below   

    res.render("list", { 
        nameOfDay: day
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});