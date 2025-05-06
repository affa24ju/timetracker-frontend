import { useState } from "react";
import { api } from "../api";
//import axios from "axios";

interface Props {
    onCategoryCreated: () => void;
}

export const CategoryForm = ({ onCategoryCreated }: Props) => {
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            await api.post("/categories", { name });
            setName("");
            onCategoryCreated(); //uppdaterar listan i förälder
        } catch (err) {
            console.error("Fel vid skapandet av kategori: ", err);   
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2 items-center">
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ny kategori"
                className="px-4 py-2 border rounded w-full"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Lägg till
            </button>
        </form>
    );
};