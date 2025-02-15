"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


// Import images from assets folder
import rainyBg from "@/assets/rainy.jpg";
import cloudyBg from "@/assets/white-fluffy-clouds-with-blue-sky-on-sunny-day-beautiful-summer-cloudy-sky-background-free-photo.jpg";
import clearBg from "@/assets/sun-7161716_640.jpg";
import snowyBg from "@/assets/snowy.jpg";

interface Weather {
  city: string;
  current: {
    temperature: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    visibility: number;
    description: string;
    icon: string;
  };
  forecast: [
    {
      date: string;
      temperature: {
        min: number;
        max: number;
      }
      humidity: number;
    }
  ];
}

export default function Dashboard() {
  const [city, setCity] = useState("Boac");
  const [weather, setWeather] = useState<Weather | null>(null);

  const getWeather = async (cityName: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get-weather?city=${cityName}`
      );
      console.log("Weather data:", response.data); // Debugging
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    }
  };

  useEffect(() => {
    getWeather(city);
  }, [city]);

  // Function to get background image based on weather description
  const getBackgroundImage = (description: string | undefined) => {
    if (!description) return "";

    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes("rain") || lowerDesc.includes("drizzle"))
      return rainyBg.src;
    if (lowerDesc.includes("cloud") || lowerDesc.includes("overcast"))
      return cloudyBg.src;
    if (lowerDesc.includes("clear") || lowerDesc.includes("sun"))
      return clearBg.src;
    if (lowerDesc.includes("snow") || lowerDesc.includes("sleet"))
      return snowyBg.src;

    return "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-500 space-x-2">
      <div
        className="w-80 h-96 bg-white bg-opacity-80 rounded-md p-4 shadow-lg"
        style={{
          backgroundImage: weather
            ? `url(${getBackgroundImage(weather.current.description)})`
            : "",
        }}
      >
        <div className="flex flex-col items-center">
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="mb-4"
          />
          {weather ? (
            <>
              <img
                src={weather.current.icon}
                alt="Weather icon"
                className="w-16 h-16"
              />
              <h2 className="text-xl font-bold">{weather.city}</h2>
              <p className="text-lg">{weather.current.temperature}°C</p>
              <p>Humidity: {weather.current.humidity}%</p>
              <p>Wind Speed: {weather.current.wind_speed} m/s</p>
              <p>Description: {weather.current.description}</p>
              {/* <pre>{JSON.stringify(weather, null, 2)}</pre> */}
            </>
          ) : (
            <p className="text-red-500">No data available</p>
          )}
        </div>

      </div>
<div className="flex flex-row space-x-2">
{weather?.forecast &&
          weather.forecast.map((forecasts, index) => (
            <div className="border flex flex-col p-4"
            style={{
                backgroundImage: weather
                  ? `url(${getBackgroundImage(weather.current.description)})`
                  : "",
              }} key={index}>
                 <img
                src={weather.current.icon}
                alt="Weather icon"
                className="w-16 h-16"
              />
                <p>{forecasts.date}</p>
                <p>{forecasts.temperature.min}</p>
                <p>{forecasts.humidity}</p>
            </div>
          ))}
</div>
    </div>
  );
}
