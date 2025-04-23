"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Header from "@/app/components/header";
import AirPollution, {AirQualityData} from "@/app/components/widget/airPollution"


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
      style={{
        backgroundImage: `url('/path/to/background-image.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
       <header className="text-4xl font-bold mb-8">
     <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
     <AirPollution airQuality={airQuality}/>
    </header>

    </div>
  );
}
