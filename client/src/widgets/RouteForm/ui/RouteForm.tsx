import {
  Box,
  Button,
  FileInput,
  Input,
  Modal,
  Select,
  Space,
  Text,
  Textarea,
} from '@mantine/core';

import style from './RouteForm.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { createRouteThunk } from '@/entities/route';
import { useNavigate } from 'react-router-dom';
import { YandexMap } from '@/widgets/Map/ui/YandexMap';
import { clearPoints, Point } from '@/entities/point';
import { checkModerationThunk } from '@/entities/moderation/api/ModerationThunk';
import { setError } from '@/entities/moderation/slice/ModerationSlice';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';

type InputsType = {
  title: string;
  description: string;
  category: '' | 'автомобильный' | 'пеший' | 'велосипедный';
  files: File[];
  points: Point[];
};

const initialState: InputsType = {
  title: '',
  description: '',
  category: '',
  files: [],
  points: [],
};

export function RouteForm(): React.JSX.Element {
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { success, error } = useAppSelector((state) => state.moderation);
  const navigate = useNavigate();
  const { points } = useAppSelector((state) => state.points);

  useEffect(() => {
    if (error) {
      setOpened(true);
    }
  }, [error, dispatch]);

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

  const createRoute = async (
    values: InputsType,
    e: FormEvent<HTMLFormElement> | undefined,
  ): Promise<void> => {
    e?.preventDefault();
    try {
      dispatch(setError.setError());
      dispatch(
        checkModerationThunk({ title: values.title, description: values.description }),
      );

      if (!success) {
        return;
      }

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('points', JSON.stringify(points));
      values.files.forEach((file) => {
        formData.append('files', file);
      });

      dispatch(createRouteThunk(formData));
      dispatch(clearPoints());
      form.reset();

      navigate(CLIENT_ROUTES.HOME);
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
        <div className={style.routeForm}>
          <h1>Создай свой маршрут</h1>

          <div className={style.container}>
            <Box className={style.mapContainer}>
              <YandexMap />
            </Box>

            <div className={style.formContainer}>
              <Space h="md" />
              <Input.Wrapper label="Название маршрута">
                <Input
                  {...form.getInputProps('title')}
                  placeholder="Название маршрута (не более 30 смволов)"
                />
                {form.errors.title && (
                  <div style={{ color: 'red', fontSize: '12px' }}>
                    {form.errors.title}
                  </div>
                )}
              </Input.Wrapper>
              <Space h="md" />
              <Input.Wrapper label="Описание маршрута">
                <Textarea
                  {...form.getInputProps('description')}
                  placeholder="Описание маршрута (не более 500символов)"
                />
              </Input.Wrapper>
              <Space h="md" />
              <Input.Wrapper label="Тип маршрута">
                <Select
                  {...form.getInputProps('category')}
                  placeholder="Тип маршрута"
                  data={['', 'автомобильный', 'пеший', 'велосипедный']}
                />
              </Input.Wrapper>
              <Space h="md" />
              <div className={style.buttonsToAdd}>
                <Input.Wrapper label="Выберите файлы(до 6 файлов)">
                  <FileInput
                    {...form.getInputProps('files')}
                    w={200}
                    multiple
                    accept="image/*"
                    placeholder="Выберите файл(до 6)"
                  />
                </Input.Wrapper>
                <Button
                  w={160}
                  h={50}
                  m={10}
                  onClick={(event) => {
                    event.preventDefault();
                    form.onSubmit(createRoute)();
                  }}
                >
                  Создать
                </Button>
                <Button
                  w={160}
                  h={50}
                  m={10}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate('/');
                  }}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </div>
          <Modal
            opened={opened}
            onClose={() => {
              setOpened(false);
            }}
            title="Проверка введеного текста"
          >
            {error && <Text c="red">{error}</Text>}
          </Modal>
        </div>
      )}
    </>
  );
}
