const express=require('express');
const router=express.Router();
const Notes =require('../models/Notes');
const {body,validationResult}=require('express-validator') 
const featchuser=require('../middlleware/featchuser');
//get all the Notes using get request
router.get('/fetchallnotes',featchuser,async(req,res)=>{
   try{const notes=await Notes.find({user: req.user.id});
    res.json(notes);}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error occored") ;
    }
})
//add a new note all using post note login require
router.post('/addnotes',featchuser,
   [body('title','Enter a valid title').isLength({min:3}),
      body('description','Descreption must be 5 charcter').isLength({min:5}),
],async (req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});

    }
    const note=new Notes({
        
        title,description,tag,user:req.user.id
    })
    const savenotes=await note.save()
     res.json(savenotes);
   }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error occored") ;
    }

 })
 //route 3: update an exesting notes : POST "/api/notes/updatenotes"  Login required
 router.put('/updatenotes/:id',featchuser,async (req,res)=>{
    
    const {title,description,tag}=req.body;
    try{
    //create new notes object 
    const newnote={};
    if(title){newnote.title=title};
    if(description){newnote.description=description};
    if(tag){newnote.tag=tag};

    //find the note to be updated
    let note= await Notes.findById(req.params.id);
    if(!note)
    {
       return res.status(404).send("Not Found");
    }
    if(note.user.toString()!==req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json({note});
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error occored") ;
}

})

//router 4 for deleteng user notes

router.delete('/deletenotes/:id',featchuser,async (req,res)=>{
    
  try{
    //find the note to be deleted to deleted
    let note= await Notes.findById(req.params.id);
    if(!note)
    {
       return res.status(404).send("Not Found");
    }
    //allow deletion only if user owns this Note
    if(note.user.toString()!==req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }
    note=await Notes.findByIdAndDelete(req.params.id)

    res.json({"Success":" Note Has been deleted",note : note});

}
catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error occored") ;
}
})
module.exports=router