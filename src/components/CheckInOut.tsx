import axios from "axios";

interface Props {
    selectedCategory: { id: string; name: string} | null;
}

export const CheckInOut = ({ selectedCategory }: Props) => {
    const handleCheckIn = () => {
        if (!selectedCategory) return;
        axios.post("http://localhost:8080/api/tasks/checkin", {
            categoryId: selectedCategory.id,
        });
    };

    const handleCheckOut = () => {
        if (!selectedCategory) return;
        axios.post("http://localhost:8080/api/tasks/checkout", {
            categoryId: selectedCategory.id,
        });
    };

    return (
        <div className="mt-4 flex gap-4">
            

        </div>
    )
}