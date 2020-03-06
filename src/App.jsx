import React, { useState } from 'react';
import './App.scss';

function App() {
  const api = {
    apiKey: 'ef288ef8cacbcf0f5c955ad437925d36',
    apiURL: 'https://api.openweathermap.org/data/2.5/'
  };
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${api.apiURL}weather?q=${query}&units=metric&APPID=${api.apiKey}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
        .catch(err => console.log(err));
    }
  };
  const dateBuilder = d => {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  // console.log(date);
  return (
    <section
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'main main-warm'
            : 'main'
          : 'main'
      }
    >
      <h1 className="title">Weather Info App</h1>
      <div className="search-box">
        <input
          type="search"
          placeholder="Search by city name, state, country code ..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {typeof weather.main != 'undefined' ? (
        <div>
          <div className="date">
            <h1>{weather.weather[0].main}</h1>
            <h1>Temperature: {weather.main.temp} &#8451;</h1>
            <h2> {dateBuilder(new Date())} </h2>
          </div>
          <div className="grid">
            <div className="grid-div">
              <h2>City - {weather.name}</h2>
              <h2>Country - {weather.sys.country}</h2>
            </div>
            <div className="grid-div">
              <h2>Max -Temperature: {weather.main.temp_max} </h2>
              <h2>Min -Temperature: {weather.main.temp_min} </h2>
              <h2>Pressure- {weather.main.pressure} </h2>
            </div>
            <div className="grid-div">
              <h1>Clouds- {weather.clouds.all} </h1>
            </div>
            <div className="grid-div">
              <h1>wind</h1>
              <h1>Deg - {weather.wind.deg} </h1>
              <h1>Speed - {weather.wind.speed} </h1>
            </div>
            <div className="grid-div">
              <h1>Sunrise - {weather.sys.sunrise} </h1>
              <h1>Sunset - {weather.sys.sunset} </h1>
            </div>
            <div className="grid-div">
              <h1>Co-Ordinates</h1>
              <h1>Latitude : {weather.coord.lat} </h1>
              <h1>Longitude : {weather.coord.lon} </h1>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </section>
  );
}

export default App;
