import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CardWeather from './components/CardWeather'
import Loader from './components/Loader'


function App() {
  const [latLon, setLatLon] = useState({})
  const [weather, setWeather] = useState()

  const [isLoading, setIsLoading] = useState(true)
  
  let lon, lat


  useEffect(() => {
    const success = pos => {
      lon = pos.coords.longitude
      lat = pos.coords.latitude
      setLatLon({lat, lon})
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  



  useEffect(() => {
    if(latLon.lat !== undefined ){
      const API_KEY = 'baff4e2e54b2fba992d989a46b2657ba'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}`
      axios.get(url)
        .then(res => {
          setWeather(res.data)
          setIsLoading(false)
        })
        .catch(err => console.log(err))
        // .finally(()=> setIsLoading(false))
    }
    
  }, [latLon])

 



  return (
    <div className="inicio">
    {
      isLoading ?
        <Loader />
      :        
        <CardWeather weather={weather} />
    }              
    
      
    </div>
  )
}

export default App
