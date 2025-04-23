"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Header from "@/app/components/header";
import AirPollution, {AirQualityData} from "@/app/components/widget/airPollution"
import CurrentWeather, {City, HourlyForecastData} from "@/app/components/widget/currentWeather";


const airQuality: AirQualityData = {
  dt: 1710417600,
  main: { aqi: 3 },
  components: {
    co: 200.5,
    no: 0.3,
    no2: 12.8,
    o3: 90.5,
    so2: 0.8,
    pm2_5: 15.2,
    pm10: 25.3,
    nh3: 0.7,
  },
}
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
      };
      humidity: number;
      icon: string;
      description: string;
    }
  ];
}

const sampleWeatherData: HourlyForecastData = {
  dt: 1712847600,
  main: {
    temp: 30,
    feels_like: 33,
    temp_min: 28,
    temp_max: 32,
    pressure: 1012,
    humidity: 70
  },
  weather: [
    {
      id: 801,
      main: "Clouds",
      description: "few clouds",
      icon: "02d"
    }
  ],
  clouds: {
    all: 20
  },
  wind: {
    speed: 4.1,
    deg: 140,
    gust: 7.2
  },
  visibility: 10000,
  pop: 0.1,
  sys: {
    pod: "d"
  },
  dt_txt: "2025-04-11 12:00:00"
}

const sampleCity: City = {
  id: 123456,
  name: "Manila",
  coord: {
    lon: 120.9842,
    lat: 14.5995
  },
  country: "PH",
  population: 14000000,
  timezone: 28800,
  sunrise: 1712819300,
  sunset: 1712863400
}


export default function Dashboard() {
  const [city, setCity] = useState("Boac");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const getWeather = async (cityName: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/get-weather?city=${cityName}`
      );
      console.log("Weather data:", response.data);
      setWeather(response.data);
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

  <div className="w-full">
    <AirPollution airQuality={airQuality} className="w-96 h-40"/>
    <CurrentWeather data={sampleWeatherData} city={sampleCity}  className="w-96 h-40"/>
  </div>
</div>

  );
}
