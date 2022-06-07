import React, { useState } from 'react'

const CardWeather = ({ weather }) => {
    const [grade, setGrade] = useState(false)

    const switchGrade = () => {
        setGrade(!grade)
    }

    const kelvin = weather?.main.temp
    const celsio = (kelvin - 273.15).toFixed(2)
    const fahrenheit = (celsio * (9 / 5) + 32).toFixed(2)
    const getWheater = weather?.weather[0].icon


    return (
        <div className='app'>            
                <p className='app__country'>{`${weather?.name}, ${weather?.sys.country}`} </p>                           
            <img className='app__img' src={weather && `http://openweathermap.org/img/wn/${getWheater}@4x.png`} alt="icon wheater condition" />
            <div className='app__core'>
            <p className='app__core-description'>{`${weather?.weather[0].description}`}</p>
                <p className='app__core-grade'>{grade ? celsio + ' °C' : fahrenheit + ' °F'}</p>
                <button className='app__core-button' onClick={switchGrade}> Cambiar a {grade ? '°F' : '°C'}</button>
                

            </div>

            <div className='app__secondary'>
                <div className='app__secondary-date'>
                    <p>Wind</p>
                    <i class='bx bx-wind'></i>
                    <p>{`${weather?.wind.speed} km/h`}</p>
                </div>

                <div className='app__secondary-date'>

                    <p>Clouds</p>
                    <i class='bx bx-cloud'></i>
                    <p>{`${weather?.clouds.all} %`}</p>
                </div>
                <div className='app__secondary-date'>
                    <p>Humidity</p>
                    <i class='bx bx-droplet' ></i>
                    <p>{`${weather?.main.humidity} %`}</p>
                </div>
            </div>
        </div>
    )
}

export default CardWeather