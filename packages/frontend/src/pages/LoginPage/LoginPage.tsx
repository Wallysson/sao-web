import { LoginForm } from './components/LoginForm';
import { ParticlesBackground } from '../../components/ParticlesBackground';

export function LoginPage() {
  return (
    <div className="bg-white">
      <ParticlesBackground />
      <LoginForm />
    </div>
  );
}
