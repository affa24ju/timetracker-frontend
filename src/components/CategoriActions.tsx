import { useState } from "react";
import { api } from "../api";
//import axios from "axios";

interface Category {
    id: string;
    name: string;
}

interface Props {
    category: Category;
    onCategoryUpdated?: () => void;
}

export const CategoryActions = ({ category, onCategoryUpdated }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(category.name);

    const handleUpdate = async () => {
        try {
            await api.put(`/categories/${category.id}`, {
                name: newName,
            });
            setIsEditing(false);
            if (onCategoryUpdated) onCategoryUpdated();
        } catch (err) {
            console.error("Fel vid uppdatering av kategori: ", err);
            
        }
    };
    return (
        <div className="p-4 bg-white border rounded-md space-y-2">
            <p className="font-medium">
                Vald kategori: {" "} 
                <span className="font-bold">{category.name}</span>
                <br />
                <span className="text-sm text-gray-500">Blev det fel? Här kan du ändra namnet på kategorin.</span>            
            </p>

            {isEditing? (
                <div className="space-y-2">
                    <input 
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <div className="space-x-2">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={handleUpdate}
                        > Spara
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            onClick={() => {
                                setIsEditing(false);
                                setNewName(category.name);
                            }}
                        > Avbryt
                        </button>
                    </div>
                </div>
            ) : (
                <button 
                    className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => setIsEditing(true)}
                    > Redigera
                </button>
            )}
            
        </div>
    );
};