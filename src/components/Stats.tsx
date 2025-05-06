import { useEffect, useState } from "react";
import { api } from "../api";
//import axios from "axios";

interface Stat {
    categoryName: string;
    minutes: number;
}

export const Stats = () => {
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<Stat[]>("/tasks/stats/week")
            .then((res) => {
                console.log("Statistik från backend: ", res.data);
                setStats(res.data);                
            })
            .catch((err) => console.error("Fel vid hämtning av statistik: ", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Statistik för nuvarande vecka</h3>

            {loading ? (
                <p>Laddar statistik...</p>
            ) : stats.length === 0 ? (
                <div>
                    <p className="text-gray-600">
                        Det finns ingen statistik för nuvarande vecka.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Vänligen välj en annan vecka nedan om du vill se tidigare statistik.
                    </p>
                </div>
            ) : (
                <ul className="space-y-2">
                    {stats.map((stat, index) => (
                        <li key={index} className="flex justify-between">
                            <span>{stat.categoryName}</span>
                            <span className="font-semibold">
                                {Math.floor(stat.minutes / 60)}h {stat.minutes % 60}min
                            </span>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};