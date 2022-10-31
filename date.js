//jshint esversion:6

//object is basically something that gives you a reference to the object that represents the current module.
//means inside this modules here is date .js we've access to this thing called module
    
//module.export= is a js object
 exports.getDate=function (){
  const options = {      //variable never gone vary so changed to const
        weekday: "long",
        day: "numeric",
        month: "long"
    };
   const today = new Date();
  return today.toLocaleDateString("en-US", options); //formated date pasted in below   

}

exports.getDay=function (){
    const options = {      
        weekday: "long",
    };
    const today = new Date();
    return today.toLocaleDateString("en-US", options); //formated date pasted in below   
     
  
}
