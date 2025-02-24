import { usePageTitle } from '@/shared/hooks/pageTitle';
import { RouteList } from '@/widgets';

export function RoutesPage(): React.JSX.Element {
  usePageTitle()
  return <RouteList />;
}
