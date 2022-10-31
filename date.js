//jshint esversion:6

//object is basically something that gives you a reference to the object that represents the current module.
//means inside this modules here is date .js we've access to this thing called module
    
module.exports=getDate;
function getDate(){
    let options = {      
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options); //formated date pasted in below   
     
    return day;

}