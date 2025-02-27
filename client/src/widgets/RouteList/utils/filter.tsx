import { Flex, Input, Select } from '@mantine/core';
import styles from './filter.module.css';
import React, { useState, useRef } from 'react';

interface FilterProps {
  onFilterChange: (category: string, keyword: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const allCategories = ['все', 'автомобильный', 'пеший', 'велосипедный'];
  const [category, setCategory] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCategoryChange = (value: string | null) => {
    setCategory(value || '');
    if (value === 'все') {
      onFilterChange('', keyword);
    } else {
      onFilterChange(value || '', keyword);
    }
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);

    // Очистка предыдущего таймера для дебаунса
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Установка нового таймера с задержкой в 1 секунду
    debounceTimeout.current = setTimeout(() => {
      onFilterChange(category, event.target.value); // Фильтруем маршруты после задержки
    }, 1000);
  };

  // Динамическое добавление категории "все", если была выбрана категория
  // const categories = category ? ['все', ...allCategories] : allCategories;

  return (
    <Flex direction={'row'}>
      {/* Поле для ввода ключевого слова */}
      <Input
        w={270}
        h={50}
        m={'10 0 0 0'}
        className={styles.input}
        type="text"
        placeholder="Введите ключевое слово"
        value={keyword}
        onChange={handleKeywordChange}
      />

      {/* Select для выбора категории */}
      <Select
        w={200}
        h={50}
        m={'10 0 0 10'}
        className={styles.select}
        value={category}
        defaultValue={allCategories[0]}
        onChange={handleCategoryChange} // Передаем обработчик, который принимает значение и опцию
        placeholder="Категория"
        data={allCategories.map((cat) => ({ value: cat, label: cat }))}
      />
    </Flex>
  );
};
