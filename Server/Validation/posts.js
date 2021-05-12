const validator= require("validator");
const isempty =require("is-empty");

module.exports = validatedregistercontent = data => {
    
    let flaws = {};

    let {title , body} =data;


    if(!isempty(title)){
        title=title;
    }

    else{
        title="";
    }

    if(!isempty(body)){
        body=body;
    }

    else{
        body="";
    }

    if(validator.isempty(title)){
       flaws.title="Name is Required";
    }

    if(validator.isempty(body)){
        flaws.body = "Body is Required";
    }

    return {
        flaws,
        isValid: isempty(flaws)
     };

};