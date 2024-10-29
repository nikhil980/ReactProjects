const express=require('express');
const router=express.Router();
const User =require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require ('jsonwebtoken');
const featchuser=require('../middlleware/featchuser');
const {body,validationResult}=require('express-validator') 
//create a user using post "/api/auth/creatuser". no login required
const JWT_SECRET='Nikhilisagood$boy';

router.post('/creatuser',[
      body('name','Enter valid Name').isLength({min:3}),
      body('email','Enter a valid email').isEmail(),
      body('password','Enter a valid password').isLength({min:5}),
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});

    }
    try{
   let user= await User.findOne({email:req.body.email});
   if(user){
    return req.status(400).json({error:"sorry with this email already exist"})
   }
   const salt=await bcrypt.genSalt(10);
   const secPass= await bcrypt.hash(req.body.password,salt)
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass,
    });
    const data={
        user:{
            id:user.id,
        }
    }
    const authoken=jwt.sign(data,JWT_SECRET);

    res.json({authoken});
} catch(error)
{
    console.error(error.message);
    res.status(500).send("Internal server Error occored") ;
}
    
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:'Please eneter unique value for email'})})
})

//authenticate a User using: POST "/api/auth/login" no login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

const {email,password}=req.body;
try{
  let user= await User.findOne({email});
  if(!user)
  {
    return res.status(400).json({error:"Please try to login with correct EMAIL"});
  }
const passwordcompare= await bcrypt.compare(password,user.password);
if(!passwordcompare)
{
    return res.status(400).json({error:"Please try to login with correct EMAIL"});
}
const data={
    user:{
        id:user.id,
    }
    } 
    const authoken=jwt.sign(data,JWT_SECRET);

    res.json({authoken});
}
catch(error)
{
    console.error(error.message);
    res.status(500).send("Internal server Error occored") ;
}
})


//router 3 : Get Loggedin user Detail using : POST "/api/auth/getuser". Login required
router.post('/getuser',featchuser,async (req,res)=>{
try{
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
}
catch(error)
{ 
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
module.exports=router