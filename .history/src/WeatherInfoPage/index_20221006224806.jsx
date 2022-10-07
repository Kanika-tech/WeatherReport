import { useEffect, useState } from 'react';
import moment from 'moment'
import styled from 'styled-components';
import '../App.css';
import cities from '../cities.json';
import WeatherDetail from '../WeatherDetail';
import data from '../data.json'

const WeekWeather = styled.div`
    background-color: white;
    display: grid;
    grid-template-columns: auto auto auto auto;
    @media screen and (max-width: 790px) {
        grid-template-columns: none;
    }
`;

const WeatherToday = styled.div`
    background: white;
`;

const WeatherTotal = styled.div`
    background-color: white;
    display: grid;
    grid-template-columns: auto ;
`;

const Cities = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    padding: 0;
`;

const City = styled.li`
color: ${(props) => (props.selected ? "#61b2ef" : "black")};
 &:hover{
    cursor: pointer;
    color: ${(props) => (props.selected ? "#61b2ef" : "gray")};
 }
`;

function WeatherInfoPage() {
    const [weatherList, setWeatherList] = useState(data.data.slice(1,5));
    const [hasError, setHasError] = useState(false);
    const [selectedCity, setSelectedCity] = useState({});

    const fetchWeatherData = (city) => {
        const today = moment().format("YYYY-MM-DD");
        const lastDay = moment().add(4, 'days').format("YYYY-MM-DD");
          
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '7c526e4ee1msh1e57f8b43034fe8p135d35jsn832a76f722a4',
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
                }
            };
            fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lon=${city.Longitude}&lat=${city.Latitude}&start_date=${today}&end_date=${lastDay}`, options)
                .then(response => response.json())
                .then(response => {
                    console.log("resp", response);
                    setWeatherList(response.data.slice(0,5));
                })
                .catch(err => {
                    setWeatherList(data.data.slice(0,5));
                    console.error(err)
                });
    }

    useEffect(() => {
        fetchWeatherData(cities[0]);
        setSelectedCity(cities[0]);
    }, []);

    const handleSelectCity = (e, city) => {
        setSelectedCity(city);
        fetchWeatherData(city);
    }

    if(!weatherList){
        return <div>No data Available.</div>
    }

    if(hasError){
        return <div>Error fetching data.</div>
    }
    return (
        <div className="App">
             <Cities>
                {cities && cities.map((city) =>
                    <City selected={city.name === selectedCity.name} onClick={(e) => handleSelectCity(e, city)}>
                        {city.name}
                    </City>
                )}
            </Cities>
            <WeatherTotal>
                <WeatherToday>
                    <WeatherDetail index={0} details={weatherList[0]}></WeatherDetail>
                </WeatherToday>
                <WeekWeather>
                    {weatherList && weatherList.slice(1,5).map((weather, pivot) =>
                        <WeatherDetail index={pivot+1} key={weather.valid_date} details={weather}></WeatherDetail>
                    )}
                </WeekWeather>
            </WeatherTotal>
        </div>
    );
}

export default WeatherInfoPage;

