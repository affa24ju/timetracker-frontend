//Ska raderas helt 
import { useEffect, useState } from "react";
import axios from "axios";

interface WeeklyStat {
  categoryName: string;
  minutes: number;
}

export const Stats = () => {
  const [stats, setStats] = useState<WeeklyStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<WeeklyStat[]>("http://localhost:8080/api/tasks/stats/week")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Fel vid hämtning av statistik:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Laddar statistik...</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-indigo-700">Veckostatistik</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-indigo-100 text-left">
            <th className="p-2 border-b">Kategori</th>
            <th className="p-2 border-b">Tid (minuter)</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item, index) => (
            <tr key={index} className="hover:bg-indigo-50">
              <td className="p-2 border-b">{item.categoryName}</td>
              <td className="p-2 border-b">{item.minutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
/* i App.tsx inne i return
<div className="min-h-screen bg-gray-50">
<h1 className="text-2xl font-bold text-center p-6 text-indigo-800">Tidsrapporteringssystem</h1>
<Stats />
</div>*/

