# 
Let's return to our phonebook application.

Currently the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.

```js

  const addPerson = (event) =>{
    event.preventDefault();
    let isNotANewName = persons.some((person) => person['name'] === newName);
    let isNotANewNumer = persons.some((person) => person['number'] === newNumber);

    // console.log("isNewPerson" , isNewPerson)
    if(!isNotANewName && !isNotANewNumer){

      const personObj = {name: newName , number: newNumber};

        axios
          .post('http://localhost:3001/persons', personObj)
          .then(response => {
            setPersons(persons.concat(response.data) )
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

```


# 2.14*: Data for countries, step3
Add to the view showing the data of a single country, the weather report for the capital of that country. There are dozens of providers for weather data. I used https://weatherstack.com/.
```js
import React, {useState, useEffect} from 'react';
import axios from 'axios'

const DisplayWeather = ({locationName}) => {

  const [weather, setWeather] = useState('')

  useEffect(() => {
    // console.log('effect')
    let url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${locationName}`
    console.log('url', url)
    axios
      .get(url)
      .then(response => {
        // setCountries(response.data)
        console.log("weather", response.data)
        setWeather(response.data)
      })
  }, [])

  if(weather === ''){
    return null;
  }

  return(
    <div>
      <p>Temperature: { ' '+ weather.current.temperature + ' '}Celcius</p>
         <img alt="" height={100} src={weather.current.weather_icons[0]}></img>
         <p>Wind: { weather.current.wind_speed +' '} direction { ' '+weather.current.wind_dir} </p>
    </div>
  )
}

const DisplayCountry = ({country}) => {
  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Language</h3>
      <ul>
      {country.languages.map( (language,i) => <li key={i}> {language.name}</li>)}
      </ul>
      <img alt="" height={ 100} src={country.flag}></img>
      <h3>Weather in {country.capital} </h3>
      <DisplayWeather locationName={country.capital}/>
    </div>
  )
}

const Filter = ({countries, handleShowCountryButton}) => {

  return(
    <div>
      {countries.map((country, i) => 
      <div key={i}>{country.name}  <button onClick={()=>handleShowCountryButton(country.name)}>show</button>  </div>
      )}
    </div>
  )
}


const Display = ({showCountry, handleShowCountryButton})=>{

  return(
    <div>
        { 
          showCountry.length!==1 ?
          <Filter countries={showCountry} handleShowCountryButton={handleShowCountryButton}/>
          :
          <DisplayCountry country={showCountry[0]} />
        }
           
    </div>

  )
}

const App = () =>{
  const [countries, setCountries] = useState([])
  const [userInput, setUserInput] = useState('')
  const [showCountry, setShowCountry] = useState([])
  // const [showWeather, setshowWeather] = useState([])


  // hook, retrieve data from country's data api 
  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        // console.log("country", response.data)
      })
  }, [])

  const handleUserInput = (event) =>{
    event.preventDefault();
    const value = event.target.value
    setUserInput(value)

    const filteredCountry = countries.filter( country => country.name.toLowerCase().includes(value.toLowerCase()) );
    setShowCountry(filteredCountry)
  }

  const handleShowCountryButton = (value) =>{
    setUserInput(value)
    const filteredCountry = countries.filter( country => country.name.toLowerCase().includes(value.toLowerCase()) );
    setShowCountry(filteredCountry)
  }

  

  return(
    <div>
      find countries  
      <input value={userInput} onChange={handleUserInput}></input>
      {/* <p>Match: {userInput}</p> */}
      <br></br>
      <Display showCountry={showCountry} handleShowCountryButton={handleShowCountryButton} />
    </div>
  )
}

export default App;

```
# 2.13*: Data for countries, step2
```js
import React, {useState, useEffect} from 'react';
import axios from 'axios'

const DisplayCountry = ({country}) => {

  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Language</h3>
      <ul>
      {country.languages.map( (language,i) => <li key={i}> {language.name}</li>)}
      </ul>
      <img alt="" height={ 100} src={country.flag}></img>
    </div>
  )
}

const Filter = ({countries, handleShowCountryButton}) => {

  return(
    <div>
      {countries.map((country, i) => 
      <div key={i}>{country.name}  <button onClick={()=>handleShowCountryButton(country.name)}>show</button>  </div>
      )}
    </div>
  )
}


const Display = ({showCountry, handleShowCountryButton})=>{

  return(
    <div>
        { 
          showCountry.length!==1 ?
          <Filter countries={showCountry} handleShowCountryButton={handleShowCountryButton}/>
          :
          <DisplayCountry country={showCountry[0]} />
        }
           
    </div>

  )
}

const App = () =>{
  const [countries, setCountries] = useState([])
  const [userInput, setUserInput] = useState('')
  const [showCountry, setShowCountry] = useState([])

  // hook, retrieve data from country's data api 
  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        // console.log("country", response.data)
      })
  }, [])

  const handleUserInput = (event) =>{
    event.preventDefault();
    const value = event.target.value
    setUserInput(value)

    const filteredCountry = countries.filter( country => country.name.toLowerCase().includes(value.toLowerCase()) );
    setShowCountry(filteredCountry)
  }

  const handleShowCountryButton = (value) =>{
    setUserInput(value)
    const filteredCountry = countries.filter( country => country.name.toLowerCase().includes(value.toLowerCase()) );
    setShowCountry(filteredCountry)
  }

  

  return(
    <div>
      find countries  
      <input value={userInput} onChange={handleUserInput}></input>
      {/* <p>Match: {userInput}</p> */}
      <br></br>
      <Display showCountry={showCountry} handleShowCountryButton={handleShowCountryButton} />

    </div>
  )
}

export default App;
```

# 2.12* Data for countries, step1
```js
import React, {useState, useEffect} from 'react';
import axios from 'axios'

const DisplayCountry = ({country}) => {

  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Language</h3>
      <ul>
      {country.languages.map( (language,i) => <li key={i}> {language.name}</li>)}
      </ul>
      <img alt="" height={ 100} src={country.flag}></img>
    </div>
  )
}

const Display = ({showCountry})=>{

  return(
    <div>
        { showCountry.length!==1?
          showCountry.map((country, i) => <div key={i}>{country.name}</div>)
          :
          <DisplayCountry country={showCountry[0]} />}
           
    </div>

  )
}

const App = () =>{
  const [countries, setCountries] = useState([])
  const [userInput, setUserInput] = useState('')
  const [showCountry, setShowCountry] = useState([])

  // hook, retrieve data from country's data api 
  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        // console.log("country", response.data)
      })
  }, [])

  const handleUserInput = (event) =>{
    event.preventDefault();
    const value = event.target.value
    setUserInput(value)

    const filteredCountry = countries.filter( country => country.name.toLowerCase().includes(value.toLowerCase()) );
    setShowCountry(filteredCountry)

  }

  return(
    <div>
      find countries  
      <input value={userInput} onChange={handleUserInput}></input>
      {/* <p>Match: {userInput}</p> */}
      <br></br>
      <Display showCountry={showCountry}/>

    </div>
  )
}

export default App;
```

# 2.11: The Phonebook Step6
Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an Effect hook.

```js
//changes
useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

```

```js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) =>{
    event.preventDefault();
    let isNotANewName = persons.some((person) => person['name'] === newName);
    let isNotANewNumer = persons.some((person) => person['number'] === newNumber);

    // console.log("isNewPerson" , isNewPerson)
    if(!isNotANewName && !isNotANewNumer){
      const personObj = {name: newName , number: newNumber};
      setPersons(persons.concat(personObj));
    
    }
    else{
      alert(`${newName} or ${newNumber} is already added to phonebook` );
    }
    setNewName('')
    setNewNumber('')
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
```

# 2.10: The Phonebook Step5
it is sufficient to extract three components from the application. Good candidates for separate components are, for example, the search filter, the form for adding new people into the phonebook, a component that renders all people from the phonebook, and a component that renders a single person's details.

```js
import React, { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ filterPersons, setFilterPersons] = useState([])

  const addPerson = (event) =>{
    event.preventDefault();
    let isNotANewName = persons.some((person) => person['name'] === newName);
    let isNotANewNumer = persons.some((person) => person['number'] === newNumber);

    // console.log("isNewPerson" , isNewPerson)
    if(!isNotANewName && !isNotANewNumer){
      const personObj = {name: newName , number: newNumber};
      setPersons(persons.concat(personObj));
    
    }
    else{
      alert(`${newName} or ${newNumber} is already added to phonebook` );
    }
    setNewName('')
    setNewNumber('')
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
```

# 2.9*: The Phonebook Step4
Implement a search field that can be used to filter the list of people by name:


```js
import React, { useState } from 'react'

const Numbers = ({persons}) =>{

  return(
    <div>
      <h2>Numbers</h2>
      {persons.map((person,i) => <p key={i}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ filterPersons, setFilterPersons] = useState([])

  const addPerson = (event) =>{
    event.preventDefault();
    let isNotANewName = persons.some((person) => person['name'] === newName);
    let isNotANewNumer = persons.some((person) => person['number'] === newNumber);

    // console.log("isNewPerson" , isNewPerson)
    if(!isNotANewName && !isNotANewNumer){
      const personObj = {name: newName , number: newNumber};
      setPersons(persons.concat(personObj));
    
    }
    else{
      alert(`${newName} or ${newNumber} is already added to phonebook` );
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (event) => {
    setFilterText(event.target.value)
    setFilterPersons( persons.filter( (person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div> filer shown with <input value={filterText} onChange={handleFilter}></input></div>
      <h2>add a new </h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /> </div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}  /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {console.log(filterText.length)}

    {filterText.length>0?
      <Numbers persons={filterPersons}></Numbers>:
      <Numbers  persons={persons}></Numbers>}
   
    </div>
  )
}

export default App
```

# 2.8: The Phonebook Step3
Expand your application by allowing users to add phone numbers to the phone book. You will need to add a second input element to the form (along with its own event handler):

```js
import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , number:'929-219-2121' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const addPerson = (event) =>{
    event.preventDefault();
    let isNotANewName = persons.some((person) => person['name'] === newName);
    let isNotANewNumer = persons.some((person) => person['number'] === newNumber);

    // console.log("isNewPerson" , isNewPerson)
    if(!isNotANewName && !isNotANewNumer){
      const personObj = {name: newName , number: newNumber};
      setPersons(persons.concat(personObj));
    
    }
    else{
      alert(`${newName} or ${newNumber} is already added to phonebook` );
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /> </div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}  /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
        {persons.map((person,i) => <p key={i}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
```


# 2.7: The Phonebook Step2

```js
 const addPerson = (event) =>{
    event.preventDefault();
    console.log(persons, "and new name", newName)
  
    const isNewPerson = persons.some((person) => person['name'] !== newName);

    console.log("isNewPerson" , isNewPerson)
    if(isNewPerson){
      const personObj = {name: newName};
      setPersons(persons.concat(personObj));
    }
    else{
      alert(`${newName} is already added to phonebook` );
    }
    setNewName('')
  }
```

# 2.6: The Phonebook Step1

```js
import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) =>{
    event.preventDefault();
    const personObj = {name: newName};
    setNewName('')
    setPersons(persons.concat(personObj));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/* <div>debug: {newName}</div> */}

      <h2>Numbers</h2>
        {persons.map((persona,i) => <p key={i}>{persona.name}</p>)}
    </div>
  )
}

export default App
```
Let's create a simple phonebook. In this part we will only be adding names to the phonebook.
Let us start with implementing the addition of a person to phonebook.
```js
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>

      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
```

# 2.5: separate module
Declare the Course component as a separate module, which is imported by the App component. You can include all subcomponents of the course into the same module.

```js
//Course.js
import React from 'react';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    // course.parts.map((part) => sum += part.exercises)
    const sum = course.parts.reduce((s,p) => s + p.exercises, 0)
    return (
        <p>Number of exercises {sum}</p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part) =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />

        </div>

    )
}

export default Course

```

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```



# 2.4: Course information step9
Let's extend our application to allow for an arbitrary number of courses:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


# 2.3*: Course information step8
If you haven't done so already, calculate the sum of exercises with the array method reduce.
```js

const Total = ({ course }) => {
    // course.parts.map((part) => sum += part.exercises)
    const sum = course.parts.reduce((s,p) => s + p.exercises, 0)
    console.log(sum)
    return (
        <p>Number of exercises {sum}</p>
    )
}

```

# 2.2: Course information step6
Show also the sum of the exercises of the course.

```js
// course.js
import React from 'react';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    let sum = 0;
    course.parts.map((part) => sum += part.exercises)
    return (
        <p>Number of exercises {sum}</p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part) =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />

        </div>

    )
}

export default Course

```

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 2.1: Course information step6
Define a component responsible for formatting a single course called Course.


```js
//course.js
import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        <Part part={course.parts[0]} />
        <Part part={course.parts[1]} />
        <Part part={course.parts[2]} />
      </div>
    )
  }

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
   
        </div>
    
    )
}
  
export default Course

```

```js
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))

```

## v1
```js
import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```