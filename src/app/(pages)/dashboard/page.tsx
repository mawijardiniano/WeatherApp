"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import WeatherWidgets from "@/app/components/widget/weatherWidget";
import CurrentWeather from "@/app/components/widget/currentWeather";
import TenDayForecast from "@/app/components/widget/tenDayForecast";
import {
  City,
  HourlyForecastData,
  AirQualityData,
  WeatherResponse,
  ForecastData,
  TenDayForecastData,
} from "@/lib/types";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [city, setCity] = useState("Boac");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<TenDayForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  const getWeather = async (cityName: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/get-weather?city=${cityName}`
      );

      const data = response.data;
      console.log(data);

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
        hourly: data.forecast.list[0],
        air: {
          dt: data.air_pollution.list[0].dt,
          main: data.air_pollution.list[0].main,
          components: data.air_pollution.list[0].components,
        },
        uv: {
          uv_index_max: data.uv_index.daily.uv_index_max[0],
        },
        tenDay: data.forecast.list.slice(0, 10),
        forecast: data.forecast,
      };

      setWeather(weatherData);
      setForecast(data.forecast);
      console.log(weatherData);
      console.log("forecast", data.forecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      setForecast(null);
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
      className={`min-h-screen flex flex-col py-10 px-20 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold">
        <Header
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
      />
        </h1>
      </header>

      <div className="w-full flex flex-wrap gap-4 px-32">
        {weather && weather.hourly && weather.tenDay ? (
          <div className="flex flex-row gap-4">
            <div className="">
              <div className="mb-4">
                <CurrentWeather data={weather.hourly} city={weather.city} />
              </div>
              <div>
                {" "}
                {forecast ? <TenDayForecast data={forecast} /> : <p></p>}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <WeatherWidgets
                data={weather.hourly}
                city={weather.city}
                airQuality={weather.air}
                uvIndexForToday={weather.uv.uv_index_max}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
