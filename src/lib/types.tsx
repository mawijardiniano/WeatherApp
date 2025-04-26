export type WeatherResponse = {
  city: City
  hourly: HourlyForecastData
  air: AirQualityData
  uv: UV
}

export type City = {
    id: number
    name: string
    coord: {
      lon: number
      lat: number
    }
    country: string
    timezone: number
    sunrise: number
    sunset: number
}


export type HourlyForecastData = {
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
      gust: number
    }
    visibility: number
    pop: number
    rain?: {
      "1h": number
    }
    sys: {
      pod: "d" | "n"
    }
    dt_txt: string
  }


  
export type AirQualityData = {
  dt: number
  main: {
    aqi: 1 | 2 | 3 | 4 | 5
  }
  components: {
    co: number
    no: number
    no2: number
    o3: number
    so2: number
    pm2_5: number
    pm10: number
    nh3: number
  }
}

export type UV = {
  uv_index_max: number
}
