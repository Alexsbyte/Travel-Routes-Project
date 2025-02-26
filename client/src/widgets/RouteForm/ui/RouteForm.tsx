import {
  Box,
  Button,
  FileInput,
  Flex,
  Group,
  Input,
  Modal,
  Select,
  Space,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { message as antMessage } from 'antd';
import style from './RouteForm.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { createRouteThunk } from '@/entities/route';
import { useNavigate } from 'react-router-dom';
import { YandexMap } from '@/widgets/Map/ui/YandexMap';
import { clearPoints, Point } from '@/entities/point';
import { checkModerationThunk, generateBeautifullThunk } from '@/entities/ai/api/AiThunk';
import { setError, cleanGeneratedText } from '@/entities/ai/slice/AiSlice';
import { RiAiGenerate2 } from 'react-icons/ri';
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
  const [textModalOpened, setTextModalOpened] = useState(false);
  const [prompt, setPrompt] = useState({ prompt: '', length: 100 });
  const [promptError, setPromptError] = useState({ prompt: '', length: '' });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { generatedText, flagged, error } = useAppSelector((state) => state.ai);
  const navigate = useNavigate();
  const { points } = useAppSelector((state) => state.points);

  useEffect(() => {
    if (error) {
      setOpened(true);
    }
  }, [error]);

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

  useEffect(() => {
    if (generatedText) {
      console.log(generatedText);
      form.setFieldValue('description', generatedText);
    }

    return () => {
      console.log(generatedText);
      dispatch(cleanGeneratedText());

      form.setFieldValue('title', '');
      form.setFieldValue('description', '');
      form.setFieldValue('category', '');
      form.setFieldValue('files', []);
    };
  }, [generatedText]);

  const createRoute = async (
    values: InputsType,
    e: FormEvent<HTMLFormElement> | undefined,
  ): Promise<void> => {
    e?.preventDefault();
    try {
      dispatch(setError());
      dispatch(
        checkModerationThunk({ title: values.title, description: values.description }),
      ).unwrap();

      console.log(flagged);
      console.log(error);

      if (flagged) {
        console.log(error);

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
      antMessage.success('Успешно создано!');
      navigate(CLIENT_ROUTES.HOME);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unexpected error');
      }
    }
  };

  const generateBeautifulText = async () => {
    setPromptError({ prompt: '', length: '' });

    if (prompt.prompt.length === 0 || prompt.prompt.length > 100) {
      setPromptError({
        prompt: 'Введите текст (до 100 символов)',
        length: '',
      });
      return;
    }

    const num = prompt.length;
    if (!num || num <= 0 || num > 500) {
      setPromptError({ prompt: '', length: 'Введите число от 1 до 500' });
      return;
    }

    dispatch(
      generateBeautifullThunk({
        prompt: `${prompt.prompt}. Текст должен быть не более ${prompt.length} символов. Не должен прерываться на полуслове`,
      }),
    );

    if (generatedText) {
      form.setFieldValue('description', generatedText);
    }

    setTextModalOpened(false);
    setPrompt({ prompt: '', length: 100 });

    console.log(generatedText);
  };

  return (
    <>
      {user && (
        <div className={style.routeForm}>
          <h1>Создай свой маршрут</h1>
          <div className={style.container}>
            <Box className={style.mapContainer}>
              <YandexMap isEditable={true}/>
            </Box>

            <div className={style.formContainer}>
              <p>Добавь свой любимый маршрут</p>
              <Space h="md" />
              <Input.Wrapper
                label="Название маршрута"
                labelProps={{
                  style: { textAlign: 'left', width: '100%', marginLeft: '3px' },
                }}
              >
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
              <Input.Wrapper
                label="Описание маршрута"
                labelProps={{
                  style: { textAlign: 'left', width: '100%', marginLeft: '3px' },
                }}
              >
                <Textarea
                  {...form.getInputProps('description')}
                  placeholder="Описание маршрута (не более 500символов)"
                />
              </Input.Wrapper>
              <Space h="md" />
              <Input.Wrapper
                label="Тип маршрута"
                labelProps={{
                  style: { textAlign: 'left', width: '100%', marginLeft: '3px' },
                }}
              >
                <Select
                  {...form.getInputProps('category')}
                  placeholder="Тип маршрута"
                  data={['', 'автомобильный', 'пеший', 'велосипедный']}
                />
              </Input.Wrapper>
              <Space h="md" />
              <div className={style.buttonsToAdd}>
                <Input.Wrapper
                  label="Добавьте до 6 файлов"
                  labelProps={{
                    style: { textAlign: 'left', width: '100%', marginLeft: '3px' },
                  }}
                >
                  <FileInput
                    {...form.getInputProps('files')}
                    w={160}
                    h={50}
                    styles={{
                      input: {
                        paddingTop: '12px',
                        paddingBottom: '12px',
                      },
                    }}
                    multiple
                    accept="image/*"
                    placeholder="Добавьте файлы"
                  />
                </Input.Wrapper>
                <Space h="md" />

                <Button
                  w={160}
                  h={50}
                  mt={25}
                  onClick={(event) => {
                    event.preventDefault();
                    form.onSubmit(createRoute)();
                  }}
                >
                  Создать
                </Button>
                <Space h="md" />

                <Button
                  w={160}
                  h={50}
                  mt={25}
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
          >
            <>
              <Flex direction={'column'} gap={'sm'} align={'center'}>
                <Title order={3}>Текст не прошел проверку.</Title>
                {error && (
                  <Text fz={18} m={20} c="red">
                    {error}
                  </Text>
                )}
              </Flex>
            </>
          </Modal>

          {/* Модальное окно для генерации красивого текста */}
          <Modal opened={textModalOpened} onClose={() => setTextModalOpened(false)}>
            <Flex direction="column" gap="md">
              <Title order={2}>Сгенерировать текст</Title>
              <Text size="sm" p={1}>
                Введите описание генерируемого текста:
              </Text>
              <Input
                placeholder="не более 100 символов"
                value={prompt.prompt}
                onChange={(event) =>
                  setPrompt((prev) => ({ ...prev, prompt: event.target.value }))
                }
                error={promptError.prompt}
              />
              {promptError.prompt && <Text c="red">{promptError.prompt}</Text>}

              <Text size="sm" p={1}>
                Длинна генерируемого текста:
              </Text>
              <Input
                type="number"
                value={prompt.length}
                onChange={(event) =>
                  setPrompt((prev) => ({ ...prev, length: +event.target.value }))
                }
                error={promptError.length}
              />
              {promptError.length && <Text c="red">{promptError.length}</Text>}

              <Group justify="flex-end">
                <Button
                  onClick={() => {
                    setTextModalOpened(false);
                    setPrompt({ prompt: '', length: 100 });

                    setPromptError({ prompt: '', length: '' });
                  }}
                  variant="outline"
                >
                  Отмена
                </Button>
                <Button onClick={generateBeautifulText}>Сгенерировать</Button>
              </Group>
            </Flex>
          </Modal>
        </div>
      )}
    </>
  );
}
