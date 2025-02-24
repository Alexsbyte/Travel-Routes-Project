import  { useState } from 'react';

export const SearchFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [latitude, setLatitude] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ title, category, latitude });
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Поиск по названию"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Тип трассы</option>
        <option value="автомобильный">Автомобильный</option>
        <option value="пеший">Пеший</option>
        <option value="велосипедный">Велосипедный</option>
      </select>
      <input
        type="range"
        min="0"
        max="100"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <button onClick={handleFilterChange}>Применить фильтры</button>
    </div>
  );
};
