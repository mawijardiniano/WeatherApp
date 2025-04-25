export type City = {
    id: number
    name: string
    coord: {
      lon: number
      lat: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }