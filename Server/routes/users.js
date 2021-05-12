const express = require("express");
const router = express.Router(); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validregister = require("../Validation/register");
const validlogin = require("../Validation/login");
const User = require("../models/newuser");
const secret = require("../Config/sectoken");

const saltRounds = 8;


router.post('/register', (req,res,next) =>{

    const {flaws, isValid} = validregister(req.body);
    const name=req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // console.log(req.body.name);
    // console.log(req.body.email);


    if(!isValid){
        return res.status(400).json(flaws);
    }

    User.findOne({$or: [{ email }, { name }] } , (err,user) =>{

        if(err){
            return res.json({status:500 , message : "Internal Server Error"});
        }

        else if(user){

            if(user.email == email){
                return res.json({status:400 , message : "Email Already Exists"});
            }

            else{
                return res.json({status:400 , message : "Name Already Exists"});
            }
            
        }

        else{

            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    
                    if(err){
                        return res.json({status:500 , message : "Internal Server Error"}); 
                    }

                    User.create(
                        {
                          name: name,
                          email: email,
                          password: hash
                        },
                        function (err, user) {
                          if (err) {
                            return res.json({ status: 500, message: "Internal Server Error" });
                          } 
                          
                          else {
                            return res.json({status: 200, message: "Registered Successfully"});
                        }
                    }
                    );
            });
            
        });
}
}); 

});


router.post("/login" ,(req,res,next)=> {

    const {flaws, isValid} = validlogin(req.body);

    if(!isValid){

        return res.status(400).json(flaws);
    }

    const email= req.body.email;
    const password = req.body.password;

    User.findOne({email} , (err,user) =>{

        if(err){
            return res.json({status:500 , message : "Internal Server Error"});
        }

        else if(user){

            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {

                   const payload = {
                      id: user.id,
                      name: user.name
                   };

                   jwt.sign(payload, secret.sectoken(), { expiresIn: 5000 }, (err, token) => {

                      if (err) {
                        return res.json({status:500 , message : "Internal Server Error"});
                      }

                      else{
                        return res.json({success: true,message: "Success",token:token});
                      }
                      
                   });
                } 
                
                else {
                   return res.json({ status:400 , message: "Password is Incorrect" });
                }
             });


        }

        else{

            return res.json({status:404 , message:"User not Registered"});
        }
    });

});


module.exports = router;