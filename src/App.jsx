import { useState } from "react";
import "./index.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import { BackGroundLayout, WeatherCard, MiniCard } from "./components";

function App() {
  // Search input state
  const [input, setInput] = useState("");
  
  // Get weather data from context
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  // Handle city search
  const handleSearch = () => {
    if (input.trim()) {
      setPlace(input);
      setInput("");
    }
  };

  return (
    <div className="w-full h-screen text-white px-8 overflow-hidden">
      {/* Search Bar */}
      <nav className="flex w-full justify-between items-center p-3">
        <h1 className="backdrop-blur-xs p-1 text-2xl font-bold text-white border-0">
          Weather App
        </h1>

        <div className="w-[15rem] overflow-hidden shadow-2xl rounded p-2 flex items-center gap-2 bg-white">
          <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            type="text"
            className="focus:outline-none w-full text-[#121212] text-lg bg-white"
            placeholder="Enter a city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </nav>

      {/* Weather Display */}
      <BackGroundLayout />

      {/* Main Weather Card and Forecast */}
      {weather.temp !== undefined && (
        <main className="w-full h-[calc(100vh-5rem)] flex items-center justify-center gap-8 px-[5%]">
          {/* Main Weather Card */}
          <div className="w-[40%]">
            <WeatherCard
              place={thisLocation}
              windspeed={weather.wspd}
              humidity={weather.humidity}
              temperature={weather.temp}
              heatIndex={weather.heatindex}
              iconString={weather.conditions}
              conditions={weather.conditions}
            />
          </div>

          {/* 6-Day Forecast Cards in 2x3 Grid */}
          <div className="w-[60%] grid grid-cols-3 gap-4">
            {values?.slice(1, 7).map((curr) => (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
