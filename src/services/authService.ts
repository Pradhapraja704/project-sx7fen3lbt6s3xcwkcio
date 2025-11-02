import { superdevClient } from '@/lib/superdev/client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      const user = await superdevClient.auth.signIn({
        email: credentials.email,
        password: credentials.password
      });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const user_data = {
        id: user.id,
        email: user.email,
        name: user.name || 'User'
      };

      localStorage.setItem('lexifix_user', JSON.stringify(user_data));
      return user_data;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthUser> {
    try {
      const user = await superdevClient.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name
      });

      if (!user) {
        throw new Error('Registration failed');
      }

      const user_data = {
        id: user.id,
        email: user.email,
        name: user.name
      };

      localStorage.setItem('lexifix_user', JSON.stringify(user_data));
      return user_data;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed. Please try again.');
    }
  }

  async logout(): Promise<void> {
    try {
      await superdevClient.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('lexifix_user');
    }
  }

  getCurrentUser(): AuthUser | null {
    try {
      const userData = localStorage.getItem('lexifix_user');
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async checkAuthStatus(): Promise<AuthUser | null> {
    try {
      const user = await superdevClient.auth.getCurrentUser();
      if (user) {
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name || 'User'
        };
        localStorage.setItem('lexifix_user', JSON.stringify(userData));
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('lexifix_user');
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authService = AuthService.getInstance();