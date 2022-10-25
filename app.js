const express= require("express");
const app= express();
const bodyParser = require("body-parser");
//const request= require("request");

var items=[  " Grocery shopping","Buy Fruits","Cook Rice", "Curry" ];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true})); //must write between set& get

app.get("/",function(req,res){
    
    var options={
        weekday: "long",
        day : "numeric",
        month : "long"
    };
    var today= new Date();
    var day = today.toLocaleDateString("en-US",options); //formated date pasted in below   

    res.render("list", { nameOfDay: day,newListItems: items });
});


app.post("/", function(req,res){  //compilation hundler that redirects the user to the home route
 var item = req.body.newItem;
 items.push(item);
res.redirect("/");
});


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});