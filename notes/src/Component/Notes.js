import { useContext, useEffect,useRef,useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {
    const context=useContext(noteContext);
    const {notes,getNote}=context;
    useEffect(()=>{
      getNote();
    },[])
    const updateNote=(note)=>
    {
      ref.current.click();
    }
    const ref=useRef(null);

    const [note,setNotes]=useState({title:" ",description:" ",tag:"default"});
    const  handleclick=(e)=>{
      e.preventDefault();
       // addNote(note.title,note.description,note.tag);
     }
     const onchange=(e)=>{
      setNotes({...note,[e.target.name]:e.target.value})
     }
  return (
   <>   
    <AddNote/>
    
    <button   ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange}/>
 </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edesc" name="edescription" onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleclick}>ADD NOTES</button>
</form>
    
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    <div className="row my-3"> 
        <h2>your notes </h2>
  {notes.map((note)=>{
    return <NoteItem key={note._id} updateNote={updateNote} note={note}/>
  })}
    </div>
    </>
  )
}

export default Notes
