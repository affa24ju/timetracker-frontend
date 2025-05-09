import { useState } from 'react'
import { CategoryList } from './components/CategoryList'
import { CategoryForm } from './components/CategoryForm';
import { CategoryActions } from './components/CategoriActions';
import { CheckInOut } from './components/CheckInOut';
import { Stats } from './components/Stats'
import { WeeklyStatsSelector } from './components/WeeklyStatsSelector';
import './App.css'

interface Category {
  id: string;
  name: string;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshCategories = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center text-indigo-700">Time tracker</h1>

      {/*<h2 className="text-3xl font-bold text-red-500">Testar Tailwind?</h2>*/}

      <div className="max-w-3xl mx-auto space-y-4">
        <CategoryForm onCategoryCreated={refreshCategories} />
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          refreshTrigger={refreshTrigger}
        />

        {selectedCategory && (
          <>
            <CategoryActions 
              category={selectedCategory} 
              onCategoryUpdated={refreshCategories} />
            <CheckInOut selectedCategory={selectedCategory} /> 
          </>
        )}
      <Stats />

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tidrapportering</h1>
        <WeeklyStatsSelector />
      </div>

      </div>
    </div>

  );
}

export default App
