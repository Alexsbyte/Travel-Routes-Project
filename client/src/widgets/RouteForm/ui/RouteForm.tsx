import { Button, FileInput, Group, Input, Select, Space, Textarea } from '@mantine/core';
import style from './RouteForm.module.css';
import { useState } from 'react';

type InputsType = {
  title: string;
  description: string;
  category: string;
};

const initialState = {
  title: '',
  description: '',
  category: 'автомобильный',
};

export function RouteForm(): React.JSX.Element {
  const [inputs, setInputs] = useState<InputsType>(initialState);
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangePhotoForm = (newFiles: File[] | File | null) => {
    if (newFiles) {
      // Если newFiles — это массив (multiple=true)
      if (Array.isArray(newFiles)) {
        setFiles(newFiles);
      }
      // Если newFiles — это один файл (multiple=false)
      else {
        setFiles([newFiles]);
      }
    } else {
      setFiles([]); // Если файл не выбран
    }
  };

  const createRoute = () => {
    if (!inputs.title.trim() || !inputs.description.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    console.log(inputs);

    setInputs(initialState);
  };

  return (
    <>
      <Group justify="center" mt="xl" className={style.routeForm}>
        <h1>Создай свой маршрут</h1>
        <iframe
          style={{ width: '1000px', height: '400px' }}
          src="https://yandex.ru/maps/"
        ></iframe>
        <div className={style.formContainer}>
          <Space h="md" />
          <Input
            onChange={handleInputChange}
            name="title"
            value={inputs.title}
            w={800}
            placeholder="Название маршрута"
          />
          <Space h="md" />
          <Textarea
            onChange={handleInputChange}
            name="description"
            value={inputs.description}
            placeholder="Описание маршрута"
          />
          <Space h="md" />
          <Select
            placeholder="Тип маршрута"
            data={['автомобильный', 'пеший', 'велосипедный']}
          />
          <Space h="md" />
          <FileInput
            w={200}
            multiple
            value={files}
            onChange={onChangePhotoForm}
            accept="image/*" // Разрешаем только изображения
            placeholder="Выберите файл"
          />
          <Space h="md" />
          <Button w={160} h={50} onClick={createRoute}>
            Создать
          </Button>
        </div>
      </Group>
    </>
  );
}
