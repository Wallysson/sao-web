import { z } from 'zod';
import logo from '../../../assets/sao-logo.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Label } from '../../../components/generic/Label';
import { Button } from '../../../components/generic/Button';
import { Input } from '../../../components/generic/Input';
import { api } from '../../../lib/axios';
import { useState } from 'react';
import { notification } from '../../../helpers/notification';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../../hooks/useSession';
import { UserType } from '../../../context/SessionContext';

const schema = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = {
  username: string;
  password: string;
};

type UserData = {
  success: boolean;
  token: string;
  user: UserType;
};

export function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const { setUser } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setIsLoading(true);
      const response = await api.post<UserData>('/users', data);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      notification('Authentication failed', 'error');
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col absolute inset-0 w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-black px-6 py-8 mt-12 min-w-[20rem] flex justify-center items-center flex-col min-h-96 shadow-lg rounded-md"
      >
        <img src={logo} alt="Logo SAO" className="w-20 my-5" />
        <div className="mb-4 w-full">
          <Label
            htmlFor="username"
            text="Usuário"
            variant="bold"
            size="small"
          />
          <Input
            variant="standard"
            type="text"
            id="username"
            register={register('username')}
            error={errors.username?.message}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4 w-full">
          <Label htmlFor="password" text="Senha" variant="bold" size="small" />
          <Input
            variant="standard"
            type="password"
            id="password"
            register={register('password')}
            error={errors.password?.message}
          />
        </div>
        <Button
          color="gray"
          size="medium"
          type="submit"
          loading={isLoading}
          onClick={() => onSubmit}
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}
