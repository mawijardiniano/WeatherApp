import { Card } from "@/components/ui/card";
import { City } from "@/lib/types";

interface SunProps {
  sun: City;
}

export default function Sun({ sun }: SunProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="w-60 h-40 p-4">
      <h2 className="text-lg font-bold mb-2">Sunrise & Sunset</h2>
      <p>🌅 Sunrise: {formatTime(sun?.sunrise)}</p>
      <p>🌇 Sunset: {formatTime(sun?.sunset)}</p>
    </Card>
  );
}