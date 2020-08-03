import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personeService from './services/persons'

const Persons = ({persons}) =>{

  return(
    <div>
      {persons.map((person,i) => <p key={i}>{person.name} {person.number}</p>)}
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

    // console.log("isNewPerson" , isNewPerson)
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterText={filterText} handleFilter={handleFilter}></Filter>

      <h2>Add a new </h2>

    <PersonsForm addPerson={addPerson} setNewName={setNewName}  setNewNumber={setNewNumber}>  newNumber={newNumber} newName={newName}</PersonsForm>

      <h2>Numbers</h2>
    {filterText.length>0? <Persons persons={filterPersons}></Persons>: <Persons  persons={persons}></Persons>}
   
    </div>
  )
}

export default App