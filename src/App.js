import { useEffect, useState } from "react";

const days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday' ,'Saturday']


export default function App() {
  return (
    <div className="app">
        <Weather/>
    </div>
  )
}

function Weather() {
  const [country , setCountry] = useState('Cairo');
  const [isLoading , setIsLoading] = useState(false)
  const [weather , setWeather] =useState([])
  const [location , setLocation] = useState('');

  async function fetchData() {
  
    setIsLoading(true)
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8aa3007400d94c1487562047232608&q=${country}&days=7`);    
    const data = await res.json();
    setLocation(data.location)
    setWeather(data.forecast.forecastday);
    setIsLoading(false)
  }

  useEffect(()=>{
    fetchData()
  },[])
  
  return (
    <>
    <h1>Weather</h1>
    <div>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Search for location...." />
    </div>
    <button onClick={fetchData}>Get Weather</button>
    {isLoading ? <Loader /> : <WeatherList weather={weather}  location={location} />}
    </>
  )
}

function Loader() {
  return (
    <div className="loader">
      <p>Loading....</p>
    </div>
  )
}

function WeatherList({weather,location}) {
  return (
    <>
      <h2>{location.name}</h2>
      <ul className='weather'>
        {weather.map((weatherData) => <Day key={weatherData.date_epoch} weatherData={weatherData}/>)}
      </ul>
    </>
  )
}

function Day({weatherData}) {
  const {icon , text} = weatherData.day.condition;
  const { maxtemp_c, mintemp_c } = weatherData.day;
  const isToday = new Date(weatherData.date).getDay() === new Date().getDay() ;

   return (
     <li className='day'>
       <img src={icon} alt={text}/>
       <p>{isToday ? 'Today' : days[new Date(weatherData.date).getDay()]}</p>
       <p>{mintemp_c}&deg; &mdash; <strong>{maxtemp_c}&deg;</strong></p>
     </li>
   )
} 