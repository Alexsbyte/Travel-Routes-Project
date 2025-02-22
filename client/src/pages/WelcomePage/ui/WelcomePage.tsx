import { Welcome } from '@/widgets';
import { Container } from '@mantine/core';

export function WelcomePage(): React.JSX.Element {
  return (
    <Container size="lg">
      <Welcome />
    </Container>
  );
}
