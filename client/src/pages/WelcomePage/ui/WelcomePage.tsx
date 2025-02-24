import { usePageTitle } from '@/shared/hooks/pageTitle';
import { Welcome } from '@/widgets';
// import { Container } from '@mantine/core';

export function WelcomePage(): React.JSX.Element {
  usePageTitle()
  return <Welcome />;
}
