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
