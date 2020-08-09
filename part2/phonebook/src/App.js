import React, { useState, useEffect } from 'react'
import personeService from './services/persons'
import './index.css'


const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if(type === 'sucess'){
    return (
      <div className="sucess">
        {message}
      </div>
    )
  }

  if(type === 'error'){
    return (
      <div className="error">
        {message}
      </div>
    )
  }
 
}

const Persons = ({persons, deletePerson}) =>{
  return(
    <div>
      {persons.map((person) => <p key={person['_id']}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>)}
    </div>
  )
}

const Filter = (props) =>{

  return(
    <div>
      <div> filer shown with <input value={props.filterText} onChange={props.handleFilter}></input></div>
    </div>
  )
}

const PersonsForm = (props) =>{

  return(
   <form onSubmit={props.addPerson}>
        <div> name: <input value={props.newName} onChange={(event) => props.setNewName(event.target.value)} /> </div>
        <div>number: <input value={props.newNumber} onChange={(event) => props.setNewNumber(event.target.value)}  /></div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ filterPersons, setFilterPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  // const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [notificationType, setNotificationType] = useState('sucess')


  useEffect(() => {
    console.log('effect')
    personeService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) =>{
    event.preventDefault();
    let isNotANewName = persons.some((person) => person['name'] === newName);
    let isNotANewNumer = persons.some((person) => person['number'] === newNumber);

    // create a new person
    if(!isNotANewName && !isNotANewNumer){

      const personObj = {name: newName , number: newNumber};

        personeService
          .create(personObj)
          .then(personObject => {
            setPersons(persons.concat(personObject))

            setNotificationMessage(`Added ${personObject.name}`)
            setNotificationType('sucess');

            setTimeout(() => {
              setNotificationMessage(null)
            }, 2000);

            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotificationMessage(`${error.response.data.error}`)
            setNotificationType('error');
          })
  
      // setPersons(persons.concat(personObj));
    }
    else if(!isNotANewNumer){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){

        // find id 
        const foundPerson = persons.find( person => person.name === newName);
        const changedPerson = {... foundPerson, number: newNumber}

        //update 
        personeService
          .update(foundPerson._id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map( person => person._id !== foundPerson._id ? person: returnedPerson ))
          })
          .catch( error =>{
            setNotificationType('error');
            setNotificationMessage(`Information of ${newName} has already been removed from serer`)

            setTimeout(() => {
              setNotificationMessage(null)
            }, 2000);

          })
      }
    }

    else{
      alert(`${newName} is already added to phonebook` );
      setNewName('')
      setNewNumber('')
    }
   
  }

  const handleFilter = (event) => {
    setFilterText(event.target.value)
    setFilterPersons( persons.filter( (person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const deletePerson = (personToBeDeleted) => {

    console.log('delete: ',personToBeDeleted._id )
    if(window.confirm(`Delete ${personToBeDeleted._id}`)){
      personeService
      .deleteObjectById(personToBeDeleted._id)
      .then(
        setPersons(persons.filter((person) => person['_id'] !== personToBeDeleted['_id']))
      )
      .then(
        setFilterText('')
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />

      <Filter filterText={filterText} handleFilter={handleFilter}></Filter>

      <h2>Add a new </h2>

    <PersonsForm addPerson={addPerson} setNewName={setNewName}  setNewNumber={setNewNumber}>  newNumber={newNumber} newName={newName}</PersonsForm>

      <h2>Numbers</h2>
    {filterText.length>0? <Persons deletePerson={deletePerson} persons={filterPersons}></Persons>: <Persons deletePerson={deletePerson}  persons={persons}></Persons>}
   
    </div>
  )
}

export default App