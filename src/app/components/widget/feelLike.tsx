import { HourlyForecastData } from "@/lib/types"
import {Card} from "@/components/ui/card"

interface FeelsLikeProps {
    feel: HourlyForecastData
}


export default function Feel({feel}:FeelsLikeProps) {
    return(
        <Card className="w-60 h-40 p-4 flex flex-col">
            <h1 className="text-xs">Feels Like</h1>
            <div  className="w-full flex text-2xl font-bold">
            <p>{feel?.main.feels_like}</p>
            </div>
        </Card>
    )
}