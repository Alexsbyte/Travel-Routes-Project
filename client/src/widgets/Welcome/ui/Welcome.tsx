import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Image,
  Menu,
  Paper,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { IconDots, IconEye, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
];

export function Welcome(): React.JSX.Element {
  const navigate = useNavigate();

  const handler = () => {
    navigate("/");
  };

  return (
    <>
      <Paper shadow="xl" radius="lg" p="xl">
        <Text>
          Добро пожаловать в мир путешествий, где каждый может стать создателем
          своих приключений! 🌍✨
        </Text>
        <Space h="md" />
        <Text>
          Наш сайт — это пространство для вдохновения и обмена идеями. Здесь вы
          можете не только планировать свои маршруты, но и делиться ими с
          другими путешественниками, а также открывать для себя уникальные пути,
          созданные такими же искателями приключений, как и вы.
        </Text>
        <Space h="md" />
        <Text>
          Добавляйте свои любимые маршруты, рассказывайте о своих открытиях и
          находите новые идеи для будущих поездок. Вместе мы создаём карту мира,
          наполненную яркими историями и полезными советами.
        </Text>
        <Space h="md" />
        <Text>
          Готовы начать? Покажите нам, куда ведёт ваша дорога, или найдите
          вдохновение в маршрутах других! 🗺️🚀 Куда отправимся сегодня? 😊
        </Text>
      </Paper>
      <Box mx="auto" w={500} p={20}>
        <Card withBorder shadow="sm" radius="md" w={600}>
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text fw={500}>Review pictures</Text>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconEye size={14} />}>
                    Preview all
                  </Menu.Item>
                  <Menu.Item leftSection={<IconTrash size={14} />} color="red">
                    Delete all
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Card.Section>

          <Text mt="sm" c="dimmed" size="sm">
            <Text span inherit c="var(--mantine-color-anchor)">
              200+ images uploaded
            </Text>
            Посмотрите галерею.
          </Text>

          <Card.Section inheritPadding mt="sm" pb="md">
            <SimpleGrid cols={3}>
              {images.map((image) => (
                <Image src={image} key={image} radius="sm" />
              ))}
            </SimpleGrid>
          </Card.Section>
          <Text>
            Пейзажи вокруг просто завораживают. Здесь можно насладиться
            живописными полями и реками, а также попробовать местные блюда в
            уютных кафе. Оценка: ⭐⭐⭐⭐⭐
          </Text>
          <Button w={120} m={10} onClick={handler}>
            Подробнее
          </Button>
        </Card>
      </Box>
    </>
  );
}
