const express = require("express");
const router = express.Router();
const post = require("../models/newpost");
const passport = require("passport");
const validpost = require("../Validation/posts");


router.get("/",passport.authenticate("jwt", { session: false }),(req, res) => {


    post.find({author:req.user.name} , (err,posts)=>{

        if(err){
            return res.json({status:400, message:"Error Fetching posts of the user"});
        }

        else{

            return res.json({status : 200, posts});
        }
    });
});


router.get("/post/:id" , (req,res)=>{

    post.find({_id:req.params.id}, (err,posts)=>{

        if(err){
            return res.json({status:400, message:"Error Fetching posts of the Id"});
        }

        else{
            return res.json({status : 400},posts);
        }
    });
});


router.get("/author/:author" , (req,res)=>{

    post.find({author : req.params.author} , (err,posts)=>{

        if(err){
            return res.json({status:400, message:"Error Fetching posts of the Author"});
        }

        else{
            return res.json({status : 400},posts);
        }
    });
});


router.post("/newpost",passport.authenticate("jwt", { session: false }) , (req,res)=>{

    const {flaws, isValid} = validpost(req.body);

    const title=req.body.title;
    const body = req.body.body;

    if(!isValid){
        return res.status(400).json(flaws);
    }

    post.findOne({$and: [{ title }, { body} ] } , (err,posts) =>{

        if(err){
            return res.json({status:500 , message : "Internal Server Error"});
        }

        else if(posts){
           
            return res.json({status:400 , message : "Post Already Exists with same Title, Body and Author!!"});
  
        }

        else{

               post.create(
                        {
                          title:title,
                          body:body,
                          author:req.user.name
                        },

                         (err, posts) => {
                          if (err) {
                            return res.json({ status: 500, message: "Internal Server Error" });
                          } 
                          
                          else {
                            return res.json({status: 200, message: "Post Added Succesfully"});
                        }
                    }
                    );      
}
});

});


router.post("/update/:id", passport.authenticate("jwt", { session: false }) ,(req , res)=>{

    const {flaws, isValid} = validpost(req.body);

    if(!isValid){
        return res.status(400).json(flaws);
    }

    const title=req.body.title;
    const body = req.body.body;
    const author = req.body.author;

    post.findOneAndUpdate({_id:req.params.id} ,{ $set: { title, body ,author} },
        { new: true ,useFindAndModify: false} , (err,posts) =>{
            
            if(err){
                res.json({status: 400, message: "Error Updating Existing Post" })
            }


            else{
                res.json({status: 200, meesage: "Post Updated Successully"});
            }

        });
});



router.post("/delete/:id",passport.authenticate("jwt", { session: false }), (req, res) =>{


    post.findOneAndDelete({_id:req.params.id} ,(err,posts)=>{

        if(err){
            res.json({status: 400, message: "Error Deleting the Post" });
        }

        else{
            res.json({status: 200, message: "Post Deleted Successfully"});
        }

    });
});



module.exports = router;