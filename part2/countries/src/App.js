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
