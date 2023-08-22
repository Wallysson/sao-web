import { UserService } from '@/services/userService';
import { Request, Response } from 'express';
import { z } from 'zod';

const userService = new UserService();

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await userService.getMany();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const authenticateUserController = async (
  req: Request,
  res: Response
) => {
  const authenticateUserSchema = z.object({
    username: z.string(),
    password: z.string(),
  });
  try {
    const { username, password } = authenticateUserSchema.parse(req.body);

    const authResponse = await userService.authenticateUser(username, password);
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds
    res.cookie('token', authResponse.token, {
      path: '/',
      domain: 'localhost',
      expires: expirationDate,
    });

    res.status(authResponse.status || 200).json(authResponse);
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
