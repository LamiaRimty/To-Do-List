const express= require("express");
const app= express();
const bodyParser = require("body-parser");
//const request= require("request");

let items=[  " Grocery shopping","Buy Fruits","Cook Rice", "Curry" ];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:true})); //must write between set& get
app.use(express.static("public"));


app.get("/",function(req,res){
    
   let options={
        weekday: "long",
        day : "numeric",
        month : "long"
    };
    let today= new Date();
    let day = today.toLocaleDateString("en-US",options); //formated date pasted in below   

    res.render("list", { nameOfDay: day,newListItems: items });
});


app.post("/", function(req,res){  //compilation hundler that redirects the user to the home route
    let item = req.body.newItem;
 items.push(item);
res.redirect("/");
});


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});