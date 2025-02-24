import { usePageTitle } from '@/shared/hooks/pageTitle';
import { RouteForm } from '@/widgets';
import { Container } from '@mantine/core';

export function 
RouteFormPage(): React.JSX.Element {
  usePageTitle()
  return (
    <Container size="lg">
      <RouteForm />
    </Container>
  );
}
