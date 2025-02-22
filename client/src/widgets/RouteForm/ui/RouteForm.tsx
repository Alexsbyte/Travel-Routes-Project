import { Button, FileInput, Group, Input, Select, Space, Textarea } from '@mantine/core';
import style from './RouteForm.module.css';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { createRouteThunk } from '@/entities/route';

type InputsType = {
  title: string;
  description: string;
  category: string | 'автомобильный' | 'пеший' | 'велосипедный';
};

const initialState = {
  title: '',
  description: '',
  category: '',
};

export function RouteForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm({
    initialValues: initialState,
    validate: {
      title: (value: string) =>
        value.trim().length === 0 ? 'Это поле обязательно для заполнения' : null,
      description: (value: string) =>
        value.trim().length === 0 ? 'Это поле обязательно для заполнения' : null,
      category: (value: string) => {
        if (!value || value?.trim().length === 0) {
          return 'Выберите тип маршрута';
        }
      },
    },
  });

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

  const createRoute = (values: InputsType) => {
    try {
      dispatch(createRouteThunk(values));
      console.log(values);
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unexpected error');
      }
    }
  };

  return (
    <>
      {user && (
        <Group justify="center" mt="xl" className={style.routeForm}>
          <h1>Создай свой маршрут</h1>
          <iframe
            style={{ width: '1000px', height: '500px' }}
            src="https://yandex.ru/maps/"
          ></iframe>
          <div className={style.formContainer}>
            <Space h="md" />

            <Input
              {...form.getInputProps('title')}
              w={800}
              placeholder="Название маршрута"
            />
            {form.errors.title && (
              <div style={{ color: 'red', fontSize: '12px' }}>{form.errors.title}</div>
            )}
            <Space h="md" />
            <Textarea
              {...form.getInputProps('description')}
              placeholder="Описание маршрута"
            />
            <Space h="md" />
            <Select
              {...form.getInputProps('category')}
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
            <Button
              w={160}
              h={50}
              onClick={(event) => {
                event.preventDefault();
                form.onSubmit(createRoute)();
              }}
            >
              Создать
            </Button>
          </div>
        </Group>
      )}
    </>
  );
}
