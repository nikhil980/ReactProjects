import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState=(props)=>
{
   const host="http://localhost:6000"
   const notesInitial =[];
   const [notes,setNotes] =useState(notesInitial)

   //get all notes
   const getNote=async ()=>{
    //TODO : Api call
            //Api call
            const response=await fetch(`${host}/api/notes/fetchallnotes`,{
              method:'GET',
              header:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxNzgxMWFhYjdmMTk5ZGQyNjhhNzZhIn0sImlhdCI6MTcyOTY0MzIzNn0.UvX8rzW2SVTDgp1mDJnCLq_ciDfTlKpMIKt9csS-wg8"
              }
               
            });
            const json=response.json();
            setNotes(json)
  }
   // Add a notes
 
      const addNote=async (title,description,tag)=>{
        //TODO : Api call
                //Api call
                const response=await fetch(`${host}/api/notes/addnotes`,{
                  method:'POST',
                  header:{
                    "Content-Type":"application/json",
                    "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxNzgxMWFhYjdmMTk5ZGQyNjhhNzZhIn0sImlhdCI6MTcyOTY0MzIzNn0.UvX8rzW2SVTDgp1mDJnCLq_ciDfTlKpMIKt9csS-wg8"
                  },
                  body: JSON.stringify({title,description,tag})
                   
                });
            // const json=response.json();
        const note= {
          "_id": "67184c0654b1f760f44189e2f",
          "user": "6717811aab7f199dd268a76a",
          "title": title,
          "description":description,
          "tag": tag,
          "date": "1729645574699",
          "__v": 0
        };
        setNotes(notes.concat(note));
      }
    
   //Delete a notes

      const deleteNote= async(id)=>{
        const response=await fetch(`${host}/api/notes/deletenotes/${id}`,{
          method:'DELETE',
          header:{
            "Content-Type":"application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxNzgxMWFhYjdmMTk5ZGQyNjhhNzZhIn0sImlhdCI6MTcyOTY0MzIzNn0.UvX8rzW2SVTDgp1mDJnCLq_ciDfTlKpMIKt9csS-wg8"
          }
           
        });
        const newNotes=notes.filter((note)=>{ return note._id!==id})
    setNotes( newNotes);
      }

   //Edit a notes

      const editNote=async (id,title,description,tag)=>{

        //Api call
        const response=await fetch(`${host}/api/notes/updatenotes/${id}`,{
          method:'POST',
          header:{
            "Content-Type":"application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxNzgxMWFhYjdmMTk5ZGQyNjhhNzZhIn0sImlhdCI6MTcyOTY0MzIzNn0.UvX8rzW2SVTDgp1mDJnCLq_ciDfTlKpMIKt9csS-wg8"
          },
          body: JSON.stringify({title,description,tag})
           
        });
    // const json=response.json();
  for(let index=0;index<notes.length;index++)
  {
    const element=notes[index];
    if(element._id===id)
    {
      element.title=title;
      element.description=description;
      element.tag=tag;
    }
  }

      }

    return(
        <noteContext.Provider value={{ deleteNote,addNote ,editNote,notes,setNotes,getNote}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;