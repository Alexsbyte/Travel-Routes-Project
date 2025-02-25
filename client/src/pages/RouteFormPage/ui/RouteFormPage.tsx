import { usePageTitle } from '@/shared/hooks/pageTitle';
import { RouteForm } from '@/widgets';

export function RouteFormPage(): React.JSX.Element {
  usePageTitle();
  return <RouteForm />;
}
