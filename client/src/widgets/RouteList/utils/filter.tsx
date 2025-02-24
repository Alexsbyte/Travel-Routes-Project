import React from 'react';

interface FilterProps {
  onFilterChange: (category: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const categories = ['автомобильный', 'пеший', 'велосипедный'];
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div>
      <label>Выберите категорию:</label>
      <select onChange={handleCategoryChange}>
        <option value="">Все</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
