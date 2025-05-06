import { useState } from "react";
import { api } from "../api";

interface Stat {
    categoryName: string;
    minutes: number;
}

export const WeeklyStatsSelector = () => {
    const [selectedWeek, setSelectedWeek] = useState<number>(0);
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFetch = () => {
        if (!selectedWeek) return;

        setLoading(true);
        setError("");

        api
            .get<Stat[]>(`/tasks/stats/specificweek?year=2025&week=${selectedWeek}`)
            .then((res) => setStats(res.data))
            .catch((err) => {
                console.error(err);
                setError("Kunde inte hämta statistik.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="p-4 bg-white rounded shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-4">Välj vecka</h3>

            <div className="flex items-center gap-2 mb-4">
                <select 
                    value={selectedWeek}
                    onChange={(e) => setSelectedWeek(Number(e.target.value))}
                    className="border p-2 rounded"
                >
                    <option value={0}>-- Välj en vecka --</option>
                    {[...Array(52)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            Vecka {i + 1}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleFetch}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    > Visa statistik
                </button>
            </div>

            {loading ? (
                <p>Laddar statistik...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : stats.length === 0 && selectedWeek !== 0 ? (
                <p>Ingen statistik hittades för vecka {selectedWeek}.</p>
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