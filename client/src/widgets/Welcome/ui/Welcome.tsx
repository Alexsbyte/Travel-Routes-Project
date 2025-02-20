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
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconDots, IconEye, IconTrash, IconMapPin } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
];

export function Welcome(): React.JSX.Element {
  const theme = useMantineTheme();
  // const navigate = useNavigate();

  const handler = () => {
    navigate("/");
  };

  return (
    <Box p="md">
      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        style={{
          background: `linear-gradient(45deg, ${theme.colors.blue[6]}, ${theme.colors.cyan[5]})`,
          color: theme.white,
        }}
      >
        <Title order={2} style={{ marginBottom: theme.spacing.md }}>
          Добро пожаловать в мир путешествий! 🌍✨
        </Title>
        <Text size="lg">
          Наш сайт — это пространство для вдохновения и обмена идеями. Здесь вы
          можете не только планировать свои маршруты, но и делиться ими с
          другими путешественниками, а также открывать для себя уникальные пути,
          созданные такими же искателями приключений, как и вы. Добавляйте свои
          любимые маршруты, рассказывайте о своих открытиях и // находите новые
          идеи для будущих поездок. Вместе мы создаём карту мира, // наполненную
          яркими историями и полезными советами.
        </Text>
        <Space h="md" />
        {/* <Button
          rightSection={<IconMapPin size={18} />}
          variant="white"
          color="blue"
          onClick={handler}
        >
          Начать путешествие
        </Button> */}
      </Paper>

      <Space h="xl" />

      <Card withBorder shadow="sm" radius="lg" style={{ overflow: "hidden" }}>
        <Card.Section
          withBorder
          inheritPadding
          py="xs"
          bg={theme.colors.gray[0]}
        >
          <Group justify="space-between">
            <Text fw={700} size="lg">
              Мой первый маршрут!
            </Text>
          </Group>
        </Card.Section>

        <Text mt="sm" c="dimmed" size="sm">
          <Text span inherit c="var(--mantine-color-anchor)">
            200+ изображений загружено
          </Text>
          Посмотрите галерею.
        </Text>

        <Card.Section inheritPadding mt="sm" pb="md">
          <SimpleGrid cols={3} spacing="md">
            {images.map((image) => (
              <Image
                src={image}
                key={image}
                radius="md"
                style={{
                  transition: "transform 0.2s",
                  ":hover": { transform: "scale(1.05)" },
                }}
              />
            ))}
          </SimpleGrid>
        </Card.Section>

        <Text mt="md" size="sm">
          Пейзажи вокруг просто завораживают. Здесь можно насладиться
          живописными полями и реками, а также попробовать местные блюда в
          уютных кафе. Оценка: ⭐⭐⭐⭐⭐
        </Text>
      </Card>
    </Box>
  );
}
