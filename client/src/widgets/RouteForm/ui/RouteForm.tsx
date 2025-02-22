import { Button, FileInput, Group, Input, Select, Space, Textarea } from '@mantine/core';
import style from './RouteForm.module.css';
import { FormEvent, useState } from 'react';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { createRouteThunk } from '@/entities/route';
import { useNavigate } from 'react-router-dom';

type InputsType = {
  title: string;
  description: string;
  category: '' | 'автомобильный' | 'пеший' | 'велосипедный';
  files: File[];
};

const initialState: InputsType = {
  title: '',
  description: '',
  category: '',
  files: [],
};

export function RouteForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: initialState,
    validate: {
      title: (value) => {
        if (value.trim().length === 0) {
          return 'Это поле обязательно для заполнения';
        } else if (value.trim().length > 30) {
          return `Это поле не должно быть длинее 30 символов, сейчас ${
            value.trim().length
          }`;
        } else {
          return null;
        }
      },

      description: (value) => {
        if (value.trim().length === 0) {
          return 'Это поле обязательно для заполнения';
        } else if (value.trim().length > 500) {
          return `Это поле не должно быть длинее 500 символов, сейчас ${
            value.trim().length
          }`;
        } else {
          return null;
        }
      },
      category: (value) => {
        if (!value || value?.trim().length === 0) {
          return 'Выберите тип маршрута';
        } else {
          return null;
        }
      },
      files: (value) => {
        const notSupported = value.find((file) => {
          if (file.size > 5 * 1024 * 1024) {
            return true;
          }

          if (
            file.name.endsWith('png') ||
            file.name.endsWith('jpg') ||
            file.name.endsWith('jpeg')
          ) {
            return false;
          }
          return true;
        });

        if (notSupported) {
          return 'Поддерживаются только: jpg, jpeg, png, либо один из файлов более 5 МБайт';
        }
        if (value.length === 0) {
          return 'Это поле обязательно для заполнения';
        }
        if (value.length > 6) {
          return 'Вы не можите добавить больше 6 фотографий';
        }

        return null;
      },
    },
  });

  const createRoute = (
    values: InputsType,
    e: FormEvent<HTMLFormElement> | undefined,
  ): void => {
    e?.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      values.files.forEach((file) => {
        formData.append('files', file);
      });
      console.log(values);

      dispatch(createRouteThunk(formData));
      form.reset();
      navigate('/');
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
            style={{ width: '1000px', height: '400px' }}
            src="https://yandex.ru/maps/"
          ></iframe>
          <div className={style.formContainer}>
            <Space h="md" />

            <Input
              {...form.getInputProps('title')}
              w={800}
              placeholder="Название маршрута (не более 30 смволов)"
            />
            {form.errors.title && (
              <div style={{ color: 'red', fontSize: '12px' }}>{form.errors.title}</div>
            )}
            <Space h="md" />
            <Textarea
              {...form.getInputProps('description')}
              placeholder="Описание маршрута (не более 500символов)"
            />
            <Space h="md" />
            <Select
              {...form.getInputProps('category')}
              placeholder="Тип маршрута"
              data={['', 'автомобильный', 'пеший', 'велосипедный']}
            />
            <Space h="md" />
            <FileInput
              {...form.getInputProps('files')}
              w={200}
              multiple
              // value={files}
              // onChange={onChangePhotoForm}
              accept="image/*" // Разрешаем только изображения
              placeholder="Выберите файл(до 6)"
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
