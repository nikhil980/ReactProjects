import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
function AddNote() {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNotes]=useState({title:" ",description:" ",tag:"default"});
   const  handleclick=(e)=>{
    e.preventDefault();
      addNote(note.title,note.description,note.tag);
   }
   const onchange=(e)=>{
    setNotes({...note,[e.target.name]:e.target.value})
   }
  return (
    <div>
    <div className='my-3'>
      <h1>Add a notes </h1>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange}/>
 </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="desc" name="description" onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleclick}>ADD NOTES</button>
</form>
    
  </div>
    </div>
  )
}

export default AddNote
