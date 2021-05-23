const express = require("express");
const router = express.Router();
const post = require("../models/newpost");
const verifytoken = require("../middleware/verifytoken");
const validpost = require("../Validation/posts");


router.get("/",verifytoken,(req, res) => {

    const username = req.username;
    // console.log(username);
    post.find({author : username} , (err,posts)=>{

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
            return res.json({status : 200,posts});
        }
    });
});


router.get("/author/:author" , (req,res)=>{

    post.find({author : req.params.author} , (err,posts)=>{

        if(err){
            return res.json({status:400, message:"Error Fetching posts of the Author"});
        }

        else{
            return res.json({status :200,posts});
        }
    });
});


router.post("/newpost",verifytoken , (req,res)=>{

    const {flaws, isValid} = validpost(req.body);

    const title=req.body.title;
    const body = req.body.body;
    const author = req.body.author;
    const username = req.username;
    
    if(!isValid){
        return res.json({status:500 , flaws,isValid});
    }

    post.findOne({$and: [{ title }, { body} ] } , (err,posts) =>{

        if(err){
            return res.json({status:500 , message : "Internal Server Error",isValid});
        }

        else if(posts){
           
            return res.json({status:400 , message : "Post Already Exists with same Title and Body!!",isValid});
  
        }

        else{

               post.create(
                        {
                          title:title,
                          body:body,
                          author:username
                        },

                         (err, posts) => {
                          if (err) {
                            return res.json({ status: 500, message: "Internal Server Error" ,isValid});
                          } 
                          
                          else {
                            return res.json({status: 200, message: "Post Added Succesfully",isValid});
                        }
                    }
                    );      
}
});

});


router.post("/update/:id",verifytoken ,(req , res)=>{

    const {flaws, isValid} = validpost(req.body);

    if(!isValid){
        return res.json({status:500 , flaws,isValid});
    }

    const title=req.body.title;
    const body = req.body.body;
    const author = req.body.author;

    post.findOneAndUpdate({_id:req.params.id} ,{ $set: { title, body ,author} },
        { new: true ,useFindAndModify: false} , (err,posts) =>{
            
            if(err){
                res.json({status: 400, message: "Error Updating Existing Post" ,isValid})
            }


            else{
                res.json({status: 200, meesage: "Post Updated Successully",isValid});
            }

        });
});



router.post("/delete/:id",verifytoken, (req, res) =>{


    post.findOneAndDelete({_id:req.params.id} ,(err,posts)=>{

        if(err){
            res.json({status: 400, message: "Error Deleting the Post" });
        }

        else{
            res.json({status: 200, message: "Post Deleted Successfully"});
        }

    });
});


router.get("/allposts",verifytoken,(req, res) => {

    // console.log(username);
    post.find({} , (err,posts)=>{

        if(err){
            return res.json({status:400, message:"Error Fetching posts!!"});
        }

        else{

            return res.json({status : 200, posts});
        }
    });
});



module.exports = router;