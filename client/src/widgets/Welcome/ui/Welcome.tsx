import { HelloCard } from '@/widgets/HelloCard';
import { Box, Card, Paper, Space, Text, Title, useMantineTheme } from '@mantine/core';

// import { useNavigate } from "react-router-dom";

export function Welcome(): React.JSX.Element {
  const theme = useMantineTheme();
  // const navigate = useNavigate();

  // const handler = () => {
  // navigate("/");
  // };

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
          Наш сайт — это пространство для вдохновения и обмена идеями. Здесь вы можете не
          только планировать свои маршруты, но и делиться ими с другими путешественниками,
          а также открывать для себя уникальные пути, созданные такими же искателями
          приключений, как и вы. Добавляйте свои любимые маршруты, рассказывайте о своих
          открытиях и // находите новые идеи для будущих поездок. Вместе мы создаём карту
          мира, // наполненную яркими историями и полезными советами.
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

      <Card withBorder shadow="sm" radius="lg" style={{ overflow: 'hidden' }}>
        <HelloCard />
      </Card>
    </Box>
  );
}
