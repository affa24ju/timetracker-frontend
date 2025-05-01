import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
    id: string;
    name: string;
}

interface Props {
    onSelectCategory: (category: Category) => void;
    selectedCategory: Category | null;
    refreshTrigger: number;
}

export const CategoryList = ({ onSelectCategory, selectedCategory, refreshTrigger }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);
   
    useEffect(() => {
        axios
            .get<Category[]>("http://localhost:8080/api/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Fel vid hämtning av kategorier: ", err));

    },[refreshTrigger]);

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Tillagda kategorier</h2>

            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category)}
                        className={`px-4 py-2 rounded-md text-white transition ${
                            selectedCategory?.id === category.id
                                ? "bg-indigo-600"
                                : "bg-indigo-400 hover:bg-indigo-500"
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};