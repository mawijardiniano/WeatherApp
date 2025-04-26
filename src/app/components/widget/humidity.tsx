import { HourlyForecastData } from "@/lib/types"
import {Card} from "@/components/ui/card"

interface FeelsLikeProps {
    humid: HourlyForecastData
}


export default function Humidity({humid}:FeelsLikeProps) {
    return(
        <Card className="w-60 h-40 p-4 flex flex-col">
            <h1 className="text-xs">Humitdity</h1>
            <div  className="w-full flex text-2xl font-bold">
            <p>{humid?.main.humidity}</p>
            </div>
        </Card>
    )
}