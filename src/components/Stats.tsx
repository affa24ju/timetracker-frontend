import { useEffect, useState } from "react";
import axios from "axios";

interface Stat {
    categoryName: string;
    minutes: number;
}

export const Stats = () => {
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<Stat[]>("http://localhost:8080/api/tasks/stats/week")
            .then((res) => {
                console.log("Statistik från backend: ", res.data);
                setStats(res.data);                
            })
            .catch((err) => console.error("Fel vid hämtning av statistik: ", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Veckostatistik</h3>

            {loading ? (
                <p>Laddar statistik...</p>
            ) : stats.length === 0 ? (
                <p className="text-grary-500">Ingen data tillgänglig</p>
            ) : (
                <ul className="space-y-2">
                    {stats.map((stat, index) => (
                        <li key={index} className="flex justify-between">
                            <span>{stat.categoryName}</span>
                            <span className="font-semibold">
                                {stat.minutes != null 
                                    ? `${Math.floor(stat.minutes / 60)}h ${stat.minutes % 60}min`
                                    : "0h 0min"}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};