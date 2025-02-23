import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { RoutesPage, WelcomePage } from '@/pages';

export function HomePage(): React.JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  console.log('fffff');

  return <>{user ? <RoutesPage /> : <WelcomePage />}</>;
}
