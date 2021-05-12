const validator= require("validator");
const isempty =require("is-empty");

module.exports = validatedregistercontent = data => {
    
    let flaws = {};

    let {email , password} =data;


    if(!isempty(email)){
        email=email;
    }

    else{
        email="";
    }

    if(!isempty(password)){
        password=password;
    }

    else{
        password="";
    }

    if(validator.isempty(email)){
       flaws.email="Name is Required";
    }

    if(validator.isEmail(email)){
        flaws.email="Enter a valid Email Id.";
    }

    if(validator.isempty(password)){
        flaws.password = "Password is Required";
    }

    if (!validator.isLength(password, { min: 6, max: 15 })) {
        flaws.password = "Password must be at least 6 characters and atmost of 15 characters";
     }



    return {
        flaws,
        isValid: isempty(flaws)
     };

};