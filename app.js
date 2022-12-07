const express = require("express");
const app = express();  //creates my App using espress
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/to-do-listDB');
const date = require(__dirname+"/date.js");

app.set('view engine', 'ejs');  //set the view engine using ejs

app.use(bodyParser.urlencoded({ extended: true })); //must write between set& get
app.use(express.static("public"));   //tell express that my static files are held inside public folder


const itemsSchema= mongoose.Schema({
    name: String
   }); 
   
   //Schema model
   
   const Item = mongoose.model("Item",itemsSchema); //singular  collection name
   const item1 = new Item({
    name:"Welcome to your TO-Do-List!"
  });

  const item2 = new Item({
   name:"Hit the + button to add a new item"
 });

 const item3 = new Item({
   name:"<-- Hit this to delete an item."
 });
 
 const defaultItems=[ item1,item2,item3];

app.get("/", function (req, res) {

    res.render("list", { listTitle: "Today", newListItems: items });
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


