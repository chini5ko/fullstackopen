import React, { useState, useEffect } from 'react'
import personeService from './services/persons'

const Persons = ({persons, deletePerson}) =>{
  return(
    <div>
      {persons.map((person) => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>)}
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
          .then(pernsonObject => {
            setPersons(persons.concat(pernsonObject))

            setNewName('')
            setNewNumber('')
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
          .update(foundPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map( person => person.id !== foundPerson.id ? person: returnedPerson ))
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

    if(window.confirm(`Delete ${personToBeDeleted.name}`)){
      personeService
      .deleteObjectById(personToBeDeleted.id)
      .then(
        setPersons(persons.filter((person) => person.id !== personToBeDeleted.id))
      )
      .then(
        setFilterText('')
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterText={filterText} handleFilter={handleFilter}></Filter>

      <h2>Add a new </h2>

    <PersonsForm addPerson={addPerson} setNewName={setNewName}  setNewNumber={setNewNumber}>  newNumber={newNumber} newName={newName}</PersonsForm>

      <h2>Numbers</h2>
    {filterText.length>0? <Persons deletePerson={deletePerson} persons={filterPersons}></Persons>: <Persons deletePerson={deletePerson}  persons={persons}></Persons>}
   
    </div>
  )
}

export default App