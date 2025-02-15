const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const apiKey = process.env.WEATHER_API_KEY;

const fetchWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required." });
    }

  
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherRes = await axios.get(weatherUrl);
    const weatherData = weatherRes.data;

    const { lon, lat } = weatherData.coord;


    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastRes = await axios.get(forecastUrl);
    const forecastData = forecastRes.data;

    const dailyForecast = {};
    forecastData.list.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0]; 
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          temperature: {
            min: entry.main.temp,
            max: entry.main.temp,
          },
          humidity: entry.main.humidity,
          wind_speed: entry.wind.speed,
          description: entry.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`,
        };
      } else {
        dailyForecast[date].temperature.min = Math.min(
          dailyForecast[date].temperature.min,
          entry.main.temp
        );
        dailyForecast[date].temperature.max = Math.max(
          dailyForecast[date].temperature.max,
          entry.main.temp
        );
      }
    });

    res.json({
      city: weatherData.name,
      country: weatherData.sys.country,
      current: {
        temperature: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        wind_speed: weatherData.wind.speed,
        visibility: weatherData.visibility,
        description: weatherData.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
      },
      forecast: Object.keys(dailyForecast).map((date) => ({
        date,
        temperature: dailyForecast[date].temperature,
        humidity: dailyForecast[date].humidity,
        wind_speed: dailyForecast[date].wind_speed,
        description: dailyForecast[date].description,
        icon: dailyForecast[date].icon,
      })),
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
    res.status(500).json({ message: "Error fetching weather data", error: error.message });
  }
};


module.exports = { fetchWeather };
