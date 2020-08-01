# 2B  Forms
```js
import React, {useState} from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)

  //In order to enable editing of the input element, 
  //we have to register an event handler that synchronizes
  // the changes made to the input with the component's state:

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) =>{
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
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
        {noteToShow.map((note) => 
          <Note key={note.id} note={note} />
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
```js
# 2A refactoring the code below into different components 
## v3
Let's move our Note component into its own module.

```js
// file Note.js
import React from 'react'

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

export default Note
```

```js
// file App.js
import React from 'react'
import Note from './components/Note'

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
```

```js
// file index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)
```
## v2
```js
//Note that the key attribute must now be defined for the Note components, and not for the li tags like before.

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}
```

## v1

```js
   {notes.map( (note) =>
         <li key={note.id}>
         {note.content}
         </li>)}
```

```js
     <li>{notes[0].content}</li>
    <li>{notes[1].content}</li>
    <li>{notes[2].content}</li> 
```

```js 
import React from 'react'
import ReactDOM from 'react-dom'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map( (note) =>
         <li key={note.id}>
         {note.content}
         </li>)}
    
     
      </ul>
    </div>
  )
}

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)
```