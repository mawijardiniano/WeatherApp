import { Card } from "@/components/ui/card"
import Clock from "@/components/ui/clock"
import { convertToDate } from "@/lib/dateUtils"
import IconComponent from "@/components/ui/icon-component"
import { ClassNameValue } from "tailwind-merge"
import {City} from "@/lib/types"

interface CurrentWeatherProps {
  data: HourlyForecastData
  city: City
  className?: ClassNameValue
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


export default function CurrentWeather({ data, city, className }: CurrentWeatherProps) {
  const initial = new Date()

  return (
    <Card className="relative flex p-4 w-60  shrink-0 flex-col justify-between overflow-hidden">
      <div className="absolute " />
      <div>
        <div className="flex justify-between text-lg font-semibold">
          <span>{convertToDate(city.timezone, data.dt, "long")}</span>
          <Clock initial={initial} timezone={city.timezone} />
        </div>
        <div className="text-md mt-2 flex font-bold">
          <span>{city.name}</span>
          <i>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-0.5 h-4 w-4 fill-none stroke-black dark:stroke-white"
            >
              <path
                d="M7.39993 6.32003L15.8899 3.49003C19.6999 2.22003 21.7699 4.30003 20.5099 8.11003L17.6799 16.6C15.7799 22.31 12.6599 22.31 10.7599 16.6L9.91993 14.08L7.39993 13.24C1.68993 11.34 1.68993 8.23003 7.39993 6.32003Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1101 13.6501L13.6901 10.0601"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
        </div>
      </div>
      <div className="flex justify-center p-4 text-6xl font-bold">
        {Math.round(data.main.temp)}&deg;
      </div>
      <div>
        <IconComponent
          weatherCode={data.weather[0].id}
          x={data.sys.pod}
          className="h-9 w-9"
        />
        <div className="font-semibold">{data.weather[0].main}</div>
        <div className="flex gap-2 dark:text-neutral-500">
          <span>H: {Math.round(data.main.temp_max)}&deg;</span>
          <span>L: {Math.round(data.main.temp_min)}&deg;</span>
        </div>
      </div>
    </Card>
  )
}