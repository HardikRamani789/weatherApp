import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // Weather data states
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Rajkot");
  const [thisLocation, setLocation] = useState("");

  // Fetch weather data from API
  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: 0,
        forecastDays: 7
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      // Get weather data
      const response = await axios.request(options);
      const thisData = Object.values(response.data.locations)[0];
      
      // Update location and weather data
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
    } catch (e) {
      console.error(e);
      alert("This place does not exist");
    }
  };

  // Fetch weather when place changes
  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider
      value={{
        weather,
        thisLocation,
        setPlace,
        values,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);
