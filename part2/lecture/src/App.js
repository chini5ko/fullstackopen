import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'



const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
        .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)

  //In order to enable editing of the input element, 
  //we have to register an event handler that synchronizes
  // the changes made to the input with the component's state:

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
    .update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })

    
  }

  const addNote = (event) =>{
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    }
  
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important': 'all'}
        </button>
      </div>


      <ul>
        {noteToShow.map((note,i) => 
          <Note
            key={i}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />        
          )}

        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit" >save</button>
        </form>
      </ul>
    </div>
  )
}

export default App