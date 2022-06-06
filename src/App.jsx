import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [obj, setObj] = useState()
  // const [grade, setGrade] = useState(true)
  const [weather, setWeather] = useState({})
  let lon, lat


  const getLatLong = () => {
    const success = pos => {
      lon = pos.coords.longitude
      lat = pos.coords.latitude
      console.log(lon, lat)
      setObj({lat, lon})
    }
    navigator.geolocation.getCurrentPosition(success)
  }

  // const switchGrade = () => setGrade(!grade)

  const API_KEY = 'baff4e2e54b2fba992d989a46b2657ba'



  useEffect(() => {
    if(obj !== undefined ){
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_KEY}`
      axios.get(url)
        .then(res => setWeather(res.data))
        .catch(err => console.log(err))
    }
    
  }, [obj])

  const kelvin = weather.main.temp
  const celsio =  (kelvin - 273.15).toFixed(2)
  const fahrenheit = (celsio * (9/5) + 32).toFixed(2)
  console.log('Fuera castillo',weather)

  return (
    <div className="App">
      <button onClick={getLatLong}>Get location</button>
      <ul>
        <li>{`${weather.name}, ${weather.sys.country}`}</li>
        <li>{`${weather.weather[0].description}`}</li>
        <li>{`${weather.wind.speed}`}</li>
        <li>{`${weather.clouds.all}`}</li>
        <li>{`${weather.main.pressure}`}</li>
        
        <li>{`${celsio} - ${fahrenheit} `}</li>
      </ul>
      <button onClick={switchGrade}> cambia</button>
    </div>
  )
}

export default App
