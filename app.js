const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const request= require("request");

let items = [" Grocery shopping", "Buy Fruits", "Cook Rice", "Curry"];
let workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true })); //must write between set& get
app.use(express.static("public"));


app.get("/", function (req, res) {

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options); //formated date pasted in below   

    res.render("list", { listTitle: day, newListItems: items });
});


app.post("/", function (req, res) {  //compilation hundler that redirects the user to the home route

    let item = req.body.newItem;

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
       
    }
    else {
    
        items.push(item);
        res.redirect("/");
       
    }
});


app.get("/work", function (req, res) {
    console.log(workItems)
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
   
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});