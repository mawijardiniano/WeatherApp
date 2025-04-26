const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const apiKey = process.env.WEATHER_API_KEY;

const fetchWeather = async (req, res) => {
  try {
    const { city } = req.query;

    console.log(`Fetching weather data for city: ${city}`);

    if (!city) {
      return res.status(400).json({ message: "City is required." });
    }

    // Current weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherRes = await axios.get(weatherUrl);
    const weatherData = weatherRes.data;

    const { lon, lat } = weatherData.coord;

    // Air pollution
    const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const airPollutionRes = await axios.get(airPollutionUrl);

    // UV Index
    const uvIndexUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;
    const uvIndexRes = await axios.get(uvIndexUrl);

    // 5-day forecast (daily & hourly both come from same endpoint)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastRes = await axios.get(forecastUrl);

    res.json({
      current: weatherData,
      air_pollution: airPollutionRes.data,
      uv_index: uvIndexRes.data,
      forecast: forecastRes.data,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
    res.status(500).json({ message: "Error fetching weather data", error: error.message });
  }
};

module.exports = { fetchWeather };
