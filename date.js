//jshint esversion:6
console.log(module);
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