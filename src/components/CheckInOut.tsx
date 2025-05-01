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
}