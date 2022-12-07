const express = require("express");
const app = express();  //creates my App using espress
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

//const request= require("request");

const items = [" Grocery shopping", "Buy Fruits", "Cook Rice", "Curry"];
const workItems = [];
const travelItems=[];

app.set('view engine', 'ejs');  //set the view engine using ejs

app.use(bodyParser.urlencoded({ extended: true })); //must write between set& get
app.use(express.static("public"));   //tell express that my static files are held inside public folder


app.get("/", function (req, res) {

    //let day=date.getDay();
    let day=date.getDate();
    res.render("list", { listTitle: day, newListItems: items });
});



app.post("/", function (req, res) {  //compilation hundler that redirects the user to the home route

    let item = req.body.newItem;

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
       
    }

    else if(req.body.list === "Travel Bucket List"){
        travelItems.push(item);
        res.redirect("/travel");
    }


    else {
    
        items.push(item);
        res.redirect("/");
       
    }
});


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/travel", function(req,res){
  res.render("list",{ listTitle : "Travel Bucket List" , newListItems : travelItems})
});

app.post("/travel",function(req,res){
    console.log(req.body);
    let item=req.body.newItem;
    travelItems.push(item);
    res.redirect("/travel");
});

app.get("/about",function(req,res){
    //console.log("1");
    res.render("about");
});

app.post("/about",function(req,res){
    //console.log("2");
    res.redirect("/about");
});

app.listen(3000, function () {  //when server is running 3000,we log it on colnsole that server running on port 3000
    console.log("Server is running on port 3000");
});


