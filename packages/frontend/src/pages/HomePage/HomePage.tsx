import { useSession } from '../../hooks/useSession';

export function HomePage() {
  const { user } = useSession();

  return <h1>{user?.sLoginUSU}</h1>;
}
