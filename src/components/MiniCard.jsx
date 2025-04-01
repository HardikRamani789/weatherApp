/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";

const MiniCard = ({ time, temp, iconString }) => {
  // States for weather icon and background color
  const [icon, setIcon] = useState();
  const [bgColor, setBgColor] = useState("");

  // Set weather icon based on conditions
  useEffect(() => {
    // Set weather icon
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) setIcon(cloud);
      else if (iconString.toLowerCase().includes("rain")) setIcon(rain);
      else if (iconString.toLowerCase().includes("clear")) setIcon(sun);
      else if (iconString.toLowerCase().includes("thunder")) setIcon(storm);
      else if (iconString.toLowerCase().includes("fog")) setIcon(fog);
      else if (iconString.toLowerCase().includes("snow")) setIcon(snow);
      else if (iconString.toLowerCase().includes("wind")) setIcon(wind);
    }

    // Set background color based on temperature
    if (temp) {
      if (temp <= 0) setBgColor("bg-blue-500");      // Cold
      else if (temp <= 10) setBgColor("bg-blue-300"); // Cool
      else if (temp <= 20) setBgColor("bg-green-300"); // Mild
      else if (temp <= 30) setBgColor("bg-yellow-300"); // Warm
      else setBgColor("bg-red-300");                  // Hot
    }
  }, [iconString, temp]);

  // Get day name from date
  const dayName = new Date(time).toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className={`glassCard w-[12rem] h-[14rem] p-4 flex flex-col ${bgColor} bg-opacity-30 relative`}>
      {/* Day Name */}
      <p className="text-center text-white font-semibold text-lg mb-2">
        {dayName}
      </p>

      {/* Weather Icon */}
      <div className="w-full flex justify-center items-center flex-1">
        <img src={icon} alt="weather" className="w-[5rem] h-[5rem]" />
      </div>

      {/* Temperature */}
      <div className="flex flex-col items-center">
        <p className="text-center font-bold text-white text-2xl">
          {temp ? Math.round(temp) : "--"}&deg;C
        </p>
      </div>
    </div>
  );
};

export default MiniCard;
