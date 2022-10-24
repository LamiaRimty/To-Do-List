const express= require("express");
const app= express();
const bodyParser = require("body-parser");
//const request= require("request");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true}));

app.get("/",function(req,res){
    
    var today= new Date();
    var currentDay= today.getDay();
    var day = "";
    
    switch (currentDay) {
        case  1:
            day="Monday";
            break;
    }
    
    switch (currentDay) {
        case  2:
            day="Tuesday";
            break;
    }
    
    switch (currentDay) {
        case  3:
            day="Wednesday";
            break;
    }
    
    switch (currentDay) {
        case  4:
            day="Thursday";
            break;
    }
    
    switch (currentDay) {
        case  5:
            day="Friday";
            break;
    }
    
    switch (currentDay) {
        case  6:
            day="Saturday";
            break;
    }
    
    switch (currentDay) {
        case  0:
            day="Sunday";
            break;
            default:
        console.log("Error: Current day is equal to:"+ currentDay)
        }

    res.render("list", { kindOfDay: day});
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});