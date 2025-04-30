import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
    id: string;
    name: string;
}

interface Props {
    onSelectCategory: (category: Category) => void;
    selectedCategory: Category | null;
}

export const CategoryList = ({ onSelectCategory, selectedCategory }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios
            .get<Category[]>("http://localhost:8080/api/categories")
            .then((res) => {
                console.log("Svar från backend: ", res.data);
                setCategories(res.data);
            }) 
            .catch((err) => console.error("Fel vid hämtning av kategorier: ", err));
    }, []);

    return (
        <div className="p-4 border rounded-md bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-2">Tillagda kategorier</h2>

            {categories.length === 0 ? (
                <p className="text-gray-500">Lägg till en kategori</p>
            ) : (
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
            )}

        </div>
    );
};