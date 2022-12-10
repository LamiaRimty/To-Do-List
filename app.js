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
 
 const listSchema ={
    name: String,
    items:[itemsSchema]
 }

 const List = mongoose.model("List",listSchema);


app.get("/", function (req, res) {

    Item.find({},function(error,foundItems){ //{conditons} should be empty it will find us everything inside items collections 
        //use the found results docs.
       if(foundItems.length=== 0){
                Item.insertMany( defaultItems,function(error){
            //deal with error or log success.
            if(error){
                console.log(error);
            }
            else{
                console.log("Successfully saved all deafult items to DB");
            }
             });

             res.redirect("/");
           }

       else{
        res.render("list", { listTitle: "Today", newListItems: foundItems });
       }
        
    })
   
});


app.get("/:customListName",function(req,res){
    const customListName = req.params.customListName;

    List.findOne({ name: customListName}, function(error,foundList){
        if(!error){
           if(!foundList){
           //Create a new list
           const list = new List({
            name: customListName,
            items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
           }
           else{
            //show an existed list
            res.render("list",{ listTitle:foundList.name , newListItems: foundList.items });
           }
        }
    });  
});

app.post("/", function (req, res) {  //compilation hundler that redirects the user to the home route

       
     //singular  collection name
    const itemName = req.body.newItem;
    const listName =req.body.list;
  
    const item = new Item({  //new document
        name:itemName
      });
      if(listName==="Today"){
        item.save();
        res.redirect("/");
      }
      else{
        List.findOne({name:listName},function(error,foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+listName);
        });
      }
    //   if(listName==="Today"){
    //     item.save();
    //     res.redirect("/");
    //   }

        // else{
        //     List.findOne({ name:listName },function(error,foundList){
        //         foundList.items.push(item);
        //         foundList.save();
        //         res.redirect("/"+listName);
        //     });
        // }

});

app.post("/delete",function(req,res){
    const checkedItemId=req.body.checkbox;
    //const listName = req.body.listName;

    //if(listName==="Today"){

        Item.findByIdAndRemove(checkedItemId,function(error){
            //handle any error or log success
            if(!error){
                console.log("Successfully deleted the checked item.");
                res.redirect("/");
            }
        });
   // }

    // else{
    //     List.findOneAndUpdate(
    //         { name:listName },
    //         { $pull: { items:{ _id:checkedItemId }}},
    //         function(error,foundList){
    //             if(!error){
    //                 res.redirect("/"+listName);
    //             }
    //         }
    //     );
    // }

    
});





app.get("/about",function(req,res){
    //console.log("1");
    res.render("about");
});

app.post("/about",function(req,res){
    //console.log("2");
    res.redirect("/about");
});

app.listen(3000, function() {  //when server is running 3000,we log it on colnsole that server running on port 3000
    console.log("Server is running on port 3000");
});


