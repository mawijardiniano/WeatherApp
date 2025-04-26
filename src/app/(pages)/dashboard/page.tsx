"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import AirPollution from "@/app/components/widget/airPollution";
import Sun from "@/app/components/widget/sun";
import Feel from "@/app/components/widget/feelLike";
import Humidity from "@/app/components/widget/humidity";
import WeatherWidgets from "@/app/components/widget/weatherWidget";
import CurrentWeather from "@/app/components/widget/currentWeather";
import { City, HourlyForecastData, AirQualityData , WeatherResponse } from "@/lib/types";

export default function Dashboard() {
  const [city, setCity] = useState("Boac");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const getWeather = async (cityName: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/get-weather?city=${cityName}`
      );
  
      const data = response.data;
  
      const weatherData: WeatherResponse = {
        city: {
          id: data.current.id,
          name: data.current.name,
          coord: data.current.coord,
          country: data.current.sys.country,
          timezone: data.current.timezone,
          sunrise: data.current.sys.sunrise,
          sunset: data.current.sys.sunset,
        },
        hourly: data.forecast.list[0], // 👈 pick the first hour or map through the list
        air: {
          dt: data.air_pollution.list[0].dt,
          main: data.air_pollution.list[0].main,
          components: data.air_pollution.list[0].components,
        },
        uv: {
          uv_index_max: data.uv_index.daily.uv_index_max[0],
        }
      };
  
      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getWeather(city);
  }, [city]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <div
      className={`min-h-screen flex flex-col py-10 px-10 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </h1>
      </header>

      <div className="w-full flex flex-wrap gap-4">
  {weather && (
    <>
      <CurrentWeather data={weather.hourly} city={weather.city} />
      <WeatherWidgets
        data={weather.hourly}
        city={weather.city}
        airQuality={weather.air}
        uvIndexForToday={weather.uv.uv_index_max}
      />
    </>
  )}
</div>

    </div>
  );
}
