
interface Category {
    id: string;
    name: string;
}

interface Props {
    category: Category;
}

export const CategoryActions = ({ category }: Props) => {
    return (
        <div className="p-4 bg-white border rounded-md">
            <p className="font-medium">Vald kategori: <span className="font-bold">{category.name}</span></p>
            <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Redigera</button>
        </div>
    );
};