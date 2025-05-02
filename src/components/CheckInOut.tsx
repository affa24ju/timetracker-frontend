import { useState } from "react";
import axios from "axios";

interface Props {
    selectedCategory: { id: string; name: string} | null;
}

interface Task {
    id?: string;
    categoryId: string;
    startTime: string;
    endTime?: string;
}

export const CheckInOut = ({ selectedCategory }: Props) => {
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const handleCheckIn = async () => {
        if (!selectedCategory) {
            alert("Välj en kategori!");
            return;
        } 
        //console.log("Checkar in: ", selectedCategory.name);
        const newTask: Task = {
            categoryId: selectedCategory.id,
            startTime: new Date().toISOString(),
        };        
        
        try {
            const res = await axios.post<Task>("http://localhost:8080/api/tasks/checkin", newTask);
            setActiveTask(res.data);
        } catch (err) {
            console.error("Fel vid Checka in: ", err);            
        }
    };

    const handleCheckOut = async () => {
        if (!activeTask || !activeTask.id) return;
        
        try {
            const endTask = {
                categoryId: selectedCategory?.id,
                activeTask: activeTask,
                endTime: new Date().toISOString(),
            };

            await axios.post(`http://localhost:8080/api/tasks/checkout/${activeTask.id}`, endTask);
            setActiveTask(null);
        } catch (err) {
            console.log("Fel vid checka ut: ", err);
            
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Checka in / ut</h3>

            {activeTask ? (
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Aktiv uppgift: {selectedCategory?.name} (started {new Date(activeTask.startTime).toLocaleTimeString("sv-SE", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        })})
                    </p>
                    <button 
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                        onClick={handleCheckOut}
                        >Checka ut
                    </button>
                </div>
            ) :(
            <button 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleCheckIn}
                >Checka in
            </button>                

        )}
        </div>
    );
};